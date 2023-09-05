package com.server.domain.order.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.server.domain.order.entity.Order;
import com.server.domain.video.entity.QVideo;
import com.server.domain.video.entity.Video;

import javax.persistence.EntityManager;

import java.util.List;
import java.util.Optional;

import static com.server.domain.cart.entity.QCart.cart;
import static com.server.domain.member.entity.QMember.*;
import static com.server.domain.order.entity.QOrder.*;
import static com.server.domain.order.entity.QOrderVideo.orderVideo;
import static com.server.domain.video.entity.QVideo.video;
import static com.server.domain.watch.entity.QWatch.watch;

public class OrderRepositoryImpl implements OrderRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public OrderRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Long deleteCartByMemberAndOrderId1(Long memberId, String orderId) {

        return queryFactory.delete(cart)
                .where(cart.video.orderVideos.any().order.orderId.eq(orderId)
                        .and(cart.member.memberId.eq(memberId))
                ).execute();
    }

    public Long deleteCartByMemberAndOrderId2(Long memberId, String orderId) {

        List<Long> deleteCartIds = queryFactory.select(cart.cartId)
                .from(cart)
                .join(cart.member, member)
                .join(cart.video, video)
                .join(video.orderVideos, orderVideo)
                .where(orderVideo.order.orderId.eq(orderId))
                .where(member.memberId.eq(memberId))
                .fetch();

        return queryFactory.delete(cart)
                .where(cart.cartId.in(deleteCartIds))
                .execute();
    }

    @Override
    public Optional<Order> findByIdWithVideos(String orderId) {

        return Optional.ofNullable(
                queryFactory.selectFrom(order)
                        .join(order.orderVideos, orderVideo).fetchJoin()
                        .join(orderVideo.video, video).fetchJoin()
                        .where(order.orderId.eq(orderId)).fetchOne()
        );
    }

    public List<Video> findWatchVideosById(String orderId) {

        JPAQuery<Video> orderVideos = queryFactory.select(video)
                .from(order)
                .join(order.orderVideos, orderVideo)
                .join(orderVideo.video, video)
                .where(order.orderId.eq(orderId));

        List<Video> watchVideos = queryFactory.select(video)
                .from(order)
                .join(order.member, member)
                .join(member.watches, watch)
                .join(watch.video, video)
                .where(order.orderId.eq(orderId)
                        .and(watch.video.in(orderVideos))
                        .and(watch.modifiedDate.after(order.modifiedDate))
                ).fetch();

        return watchVideos;
    }
}
