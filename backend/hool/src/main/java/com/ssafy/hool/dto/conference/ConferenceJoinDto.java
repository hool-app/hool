package com.ssafy.hool.dto.conference;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConferenceJoinDto {
    private Long conferenceId;
    private Long memberId;
}
