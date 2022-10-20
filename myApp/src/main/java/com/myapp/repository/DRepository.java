package com.myapp.repository;

import com.myapp.domain.D;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the D entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DRepository extends ReactiveCrudRepository<D, Long>, DRepositoryInternal {
    @Override
    <S extends D> Mono<S> save(S entity);

    @Override
    Flux<D> findAll();

    @Override
    Mono<D> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface DRepositoryInternal {
    <S extends D> Mono<S> save(S entity);

    Flux<D> findAllBy(Pageable pageable);

    Flux<D> findAll();

    Mono<D> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<D> findAllBy(Pageable pageable, Criteria criteria);

}
