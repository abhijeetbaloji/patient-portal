package com.healthcare.portal.controller;

import com.healthcare.portal.model.Document;
import com.healthcare.portal.service.DocumentService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
// Allow React (running on port 5173) to access this backend
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

  private final DocumentService service;

  public DocumentController(DocumentService service) {
    this.service = service;
  }

  @PostMapping("/upload")
  public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
    try {
      Document doc = service.storeFile(file);
      return ResponseEntity.ok(Map.of("message", "File uploaded successfully", "id", doc.getId()));
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
  }

  @GetMapping
  public List<Document> listFiles() {
    return service.getAllFiles();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
    // We need to fetch the file metadata to get the original filename
    Document doc = service.getAllFiles().stream().filter(d -> d.getId().equals(id)).findFirst().orElseThrow();
    Resource resource = service.loadFileAsResource(id);

    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_PDF)
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFilename() + "\"")
        .body(resource);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteFile(@PathVariable Long id) {
    service.deleteFile(id);
    return ResponseEntity.ok(Map.of("message", "File deleted successfully"));
  }
}