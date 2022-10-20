package com.myapp.repository;

import com.myapp.domain.B;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the B entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BRepository extends JpaRepository<B, Long> {}
