package com.server.domain.reply.service;

import com.server.domain.member.entity.Member;
import com.server.domain.member.repository.MemberRepository;
import com.server.domain.reply.dto.ReplyResponse;
import com.server.domain.reply.entity.Reply;
import com.server.domain.reply.dto.ReplyInfo;
import com.server.domain.reply.repository.ReplyRepository;
import com.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import com.server.global.exception.businessexception.replyException.ReplyNotFoundException;
import com.server.global.exception.businessexception.replyException.ReplyNotValidException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {

    private ReplyRepository replyRepository;
    private MemberRepository memberRepository;


    public ReplyService(ReplyRepository replyRepository, MemberRepository memberRepository) {
        this.replyRepository = replyRepository;
        this.memberRepository = memberRepository;
    }


    public Reply updateReply(Long loginMemberId, Long replyId, ReplyResponse response) {

        Member loginMember = memberRepository.findById(loginMemberId)
                .orElseThrow(() -> new MemberNotFoundException());

        Reply reply = existReply(replyId);

        reply.updateReply(response.getContent(), response.getStar());

        return reply;
    }

    public void deleteReply(Long replyId, Long loginMemberId) {

        Member member = memberRepository.findById(loginMemberId)
                .orElseThrow(() -> new MemberNotFoundException());

        replyRepository.deleteById(replyId);
    }


    public Reply existReply(Long replyId) {

        return replyRepository.findById(replyId)
                .orElseThrow(() -> new ReplyNotFoundException());
    }

}
