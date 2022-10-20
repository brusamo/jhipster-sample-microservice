package com.myapp.repository;

import com.myapp.domain.C;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the C entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CRepository extends JpaRepository<C, Long> {}
