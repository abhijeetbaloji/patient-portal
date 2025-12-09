package com.healthcare.portal.repository;

import com.healthcare.portal.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
  // We don't need to write any SQL! Spring does it for us.
}