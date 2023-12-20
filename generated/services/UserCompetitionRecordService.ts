
import { UserCompetitionRecordAddRequest } from "../models/UserCompetitionRecordAddRequest"
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

}

