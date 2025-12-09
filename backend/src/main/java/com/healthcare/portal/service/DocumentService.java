package com.healthcare.portal.service;

import com.healthcare.portal.model.Document;
import com.healthcare.portal.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {

  private final Path fileStorageLocation;
  private final DocumentRepository repository;

  // We inject the upload path from application.properties
  public DocumentService(@Value("${file.upload-dir}") String uploadDir, DocumentRepository repository) {
    this.repository = repository;
    this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

    try {
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception ex) {
      throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
    }
  }

  public Document storeFile(MultipartFile file) {
    // 1. Validation: Check if it is a PDF
    if (!"application/pdf".equals(file.getContentType())) {
      throw new RuntimeException("Invalid file type. Only PDFs are allowed.");
    }

    try {
      // 2. Cleanup: Generate a unique name (UUID) so we don't overwrite files with
      // the same name
      String originalFileName = file.getOriginalFilename();
      String storedFileName = UUID.randomUUID() + "_" + originalFileName;

      // 3. Save to Disk
      Path targetLocation = this.fileStorageLocation.resolve(storedFileName);
      Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

      // 4. Save to Database
      Document doc = new Document(originalFileName, storedFileName, file.getContentType(), file.getSize());
      return repository.save(doc);

    } catch (IOException ex) {
      throw new RuntimeException("Could not store file. Please try again!", ex);
    }
  }

  public List<Document> getAllFiles() {
    return repository.findAll();
  }

  // Load file from disk to download
  public Resource loadFileAsResource(Long id) {
    try {
      Document doc = repository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
      Path filePath = this.fileStorageLocation.resolve(doc.getStoredName()).normalize();
      Resource resource = new UrlResource(filePath.toUri());

      if (resource.exists()) {
        return resource;
      } else {
        throw new RuntimeException("File not found on disk");
      }
    } catch (MalformedURLException ex) {
      throw new RuntimeException("File not found", ex);
    }
  }

  public void deleteFile(Long id) {
    Document doc = repository.findById(id).orElseThrow(() -> new RuntimeException("File not found"));
    try {
      // Delete from disk
      Path filePath = this.fileStorageLocation.resolve(doc.getStoredName()).normalize();
      Files.deleteIfExists(filePath);
      // Delete from DB
      repository.delete(doc);
    } catch (IOException ex) {
      throw new RuntimeException("Could not delete file", ex);
    }
  }
}