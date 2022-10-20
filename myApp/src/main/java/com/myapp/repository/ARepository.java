package com.myapp.repository;

import com.myapp.domain.A;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the A entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ARepository extends ReactiveCrudRepository<A, Long>, ARepositoryInternal {
    @Override
    <S extends A> Mono<S> save(S entity);

    @Override
    Flux<A> findAll();

    @Override
    Mono<A> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ARepositoryInternal {
    <S extends A> Mono<S> save(S entity);

    Flux<A> findAllBy(Pageable pageable);

    Flux<A> findAll();

    Mono<A> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<A> findAllBy(Pageable pageable, Criteria criteria);

}
