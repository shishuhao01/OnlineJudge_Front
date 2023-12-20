
import { CompetitionAddRequest } from "../models/CompetitionAddRequest"
import type { BaseResponse_long_ } from "../models/BaseResponse_long_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { CompetitionQueryRequest } from "generated/models/CompetitionQueryRequest";

export class CompetitionControllerService {
 /**
   * addQuestion
   * @param questionAddRequest questionAddRequest
   * @returns BaseResponse_long_ OK
   * @returns any Created
   * @throws ApiError
   */
 public static addCompetitionUsingPost(
    competitionAddRequest: CompetitionAddRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/competition/create",
      body: competitionAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }


  public static listCompetitionByPageUsingPost(
    CompetitionQueryRequest: CompetitionQueryRequest
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/competition/list/page/vo",
      body: CompetitionQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }



  public static getCompetitionByUsingPost(
    competitionId?: number
  ): CancelablePromise<BaseResponse_long_ | any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/competition/get",
      query: {
        id: competitionId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }




}

