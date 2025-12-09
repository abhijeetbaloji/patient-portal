package com.healthcare.portal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String filename; // The name shown to the user
  private String storedName; // The unique name on the disk
  private String contentType; // e.g., "application/pdf"
  private long size; // File size in bytes
  private LocalDateTime createdAt;

  // Default Constructor (Required by JPA)
  public Document() {
  }

  // Constructor for creating new documents
  public Document(String filename, String storedName, String contentType, long size) {
    this.filename = filename;
    this.storedName = storedName;
    this.contentType = contentType;
    this.size = size;
    this.createdAt = LocalDateTime.now();
  }

  // --- Getters ---
  public Long getId() {
    return id;
  }

  public String getFilename() {
    return filename;
  }

  public String getStoredName() {
    return storedName;
  }

  public String getContentType() {
    return contentType;
  }

  public long getSize() {
    return size;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}