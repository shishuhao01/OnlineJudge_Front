import { UserCompetitionRecordAddRequest } from "../models/UserCompetitionRecordAddRequest";
import { UserCompetitionRecordDoQuestionRequest } from "../models/UserCompetitionRecordDoQuestionRequest";

import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserCompetitionRecordService {
  public static addUserCompetitionRecoedUsingPost(
    userCompetitionRecordAddRequest: UserCompetitionRecordAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/userCompetitionRecord/create",
      body: userCompetitionRecordAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getQuestionById
   * @param id id
   * @returns BaseResponse_Question_ OK
   * @throws ApiError
   */
  public static takeCompetition(
    id?: string
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/userCompetitionRecord/application",
      query: {
        competitionId: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  public static DoCompetitionQuestion(
    userCompetitionRecordDoQuestionRequest: UserCompetitionRecordDoQuestionRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/userCompetitionRecord/online/competition",
      body: userCompetitionRecordDoQuestionRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  public static getUserCompetitionRecord(
    competitionId?: string
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/userCompetitionRecord/get/UserCompetitionRecord",
      query: {
        competitionId: competitionId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
