package com.myapp.repository;

import static org.springframework.data.relational.core.query.Criteria.where;

import com.myapp.domain.B;
import com.myapp.repository.rowmapper.ARowMapper;
import com.myapp.repository.rowmapper.BRowMapper;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.function.BiFunction;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC custom repository implementation for the B entity.
 */
@SuppressWarnings("unused")
class BRepositoryInternalImpl extends SimpleR2dbcRepository<B, Long> implements BRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final ARowMapper aMapper;
    private final BRowMapper bMapper;

    private static final Table entityTable = Table.aliased("b", EntityManager.ENTITY_ALIAS);
    private static final Table aTable = Table.aliased("a", "a");

    public BRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        ARowMapper aMapper,
        BRowMapper bMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(B.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.aMapper = aMapper;
        this.bMapper = bMapper;
    }

    @Override
    public Flux<B> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<B> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = BSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(ASqlHelper.getColumns(aTable, "a"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(aTable)
            .on(Column.create("aa_id", entityTable))
            .equals(Column.create("id", aTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, B.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<B> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<B> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private B process(Row row, RowMetadata metadata) {
        B entity = bMapper.apply(row, "e");
        entity.setA(aMapper.apply(row, "a"));
        return entity;
    }

    @Override
    public <S extends B> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
