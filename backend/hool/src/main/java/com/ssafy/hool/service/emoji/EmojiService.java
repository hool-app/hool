package com.ssafy.hool.service.emoji;

import com.ssafy.hool.domain.emoji.Emoji;
import com.ssafy.hool.domain.emoji.Emoji_shop;
import com.ssafy.hool.domain.member.Member;
import com.ssafy.hool.domain.emoji.Member_emoji;
import com.ssafy.hool.dto.emoji.*;
import com.ssafy.hool.dto.emoji_shop.EmojiShopDto;
import com.ssafy.hool.dto.emoji_shop.EmojiShopUpdateDto;
import com.ssafy.hool.exception.ex.CustomException;
import com.ssafy.hool.repository.emoji.EmojiRepository;
import com.ssafy.hool.repository.emoji.EmojiShopRepository;
import com.ssafy.hool.repository.emoji.MemberEmojiRepository;
import com.ssafy.hool.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.hool.exception.ex.ErrorCode.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmojiService {

    private final EmojiRepository emojiRepository;
    private final MemberEmojiRepository memberEmojiRepository;
    private final EmojiShopRepository emojiShopRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void makeEmoji(EmojiCreateDto emojiCreateDto, Long memberId){

        Member member = memberRepository.findById(memberId).
                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        Emoji emoji = Emoji.createEmoji(memberId, emojiCreateDto.getName(), emojiCreateDto.getUrl(), emojiCreateDto.getDescription());

        Emoji savedEmoji = emojiRepository.save(emoji);

        Member_emoji memberEmoji = Member_emoji.createMemberEmoji(member, savedEmoji);
        memberEmojiRepository.save(memberEmoji);

    }

    /**
     * 멤버 이모지만 삭제되는 경우
     */
    @Transactional
    public void deleteEmoji(EmojiDeleteDto emojiDeleteDto, Long memberId){
        Emoji emoji = emojiRepository.findById(emojiDeleteDto.getEmojiId())
                .orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));

        Member member = memberRepository.findById(memberId).
                orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        // 연관관계 삭제
        member.getEmojis().remove(emoji);

        memberEmojiRepository.deleteEmoji(emojiDeleteDto.getEmojiId());
    }

    @Transactional
    public void updateEmoji(EmojiUpdateDto emojiUpdateDto, Long memberId){

        Emoji emoji = emojiRepository.findById(emojiUpdateDto.getEmojiId())
                .orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        // 받아오는 멤버 아이디와 만든이가 같을 경우 수정
        if(memberId == emoji.getCreatorId()){
            emoji.setName(emojiUpdateDto.getUpdateName());
            emoji.setDescription(emojiUpdateDto.getUpdateDes());
        }else{
            throw new CustomException(CANNOT_MODIFY_EMOJI);
        }
    }

    @Transactional
    public Long makeEmojiShop(EmojiShopDto emojiShopDto){
        Emoji emoji = emojiRepository.findById(emojiShopDto.getEmojiId()).orElseThrow(() -> new CustomException(EMOJI_NOT_FOUND));
        Emoji_shop emojiShop = Emoji_shop.createEmojiShop(emoji, emojiShopDto.getPrice());
        emojiShopRepository.save(emojiShop);
        return emojiShop.getId();
    }

    @Transactional
    public EmojiShopDto updateEmojiShop(EmojiShopUpdateDto emojiShopUpdateDto, Long memberId){
        Emoji_shop emojiShop = emojiShopRepository.findById(emojiShopUpdateDto.getEmojiShopId())
                .orElseThrow(() -> new CustomException(EMOJI_SHOP_NOT_FOUND));
        Long creatorId = emojiShop.getEmoji().getCreatorId();
        if(memberId == creatorId){
            emojiShop.setEmoji_price(emojiShopUpdateDto.getUpdatePrice());
        }else{
            throw new CustomException(CANNOT_MODIFY_EMOJI);
        }

        return new EmojiShopDto(emojiShop.getEmoji_price(), emojiShop.getEmoji().getId());
    }

    @Transactional
    public void deleteEmojiShop(Long emojiShopId){
        emojiShopRepository.deleteEmojiShop(emojiShopId);
    }

    public List<EmojiDto> listEmoji(){
        List<Emoji> emojis = emojiRepository.findAll();
        List<EmojiDto> list = new ArrayList<>();
        for (Emoji emoji : emojis){
            list.add(new EmojiDto(emoji.getName(), emoji.getUrl(), emoji.getDescription(), emoji.getCreatorId()));
        }
        return list;
    }

    public List<MemberEmojiDto> listMemberEmoji(){
        List<Member_emoji> memberEmojis = memberEmojiRepository.findAll();
        List<MemberEmojiDto> list = new ArrayList<>();
        for (Member_emoji memberEmoji : memberEmojis) {
            list.add(new MemberEmojiDto(memberEmoji.getEmoji().getId(), memberEmoji.getEmoji().getUrl()));
        }
        return list;
    }

    public List<EmojiShopDto> listEmojiShop(){
        List<Emoji_shop> emojiShops = emojiShopRepository.findAll();
        List<EmojiShopDto> list = new ArrayList<>();
        for (Emoji_shop emojiShop : emojiShops) {
            list.add(new EmojiShopDto(emojiShop.getEmoji_price(), emojiShop.getEmoji().getId()));
        }
        return list;
    }

    public List<EmojiDto> listCanEmojiShop(Long memberId){
        List<Long> sellingEmojiList = emojiRepository.sellingEmojis(memberId);

        return emojiRepository.madeByMeEmojis(sellingEmojiList);
    }

}
