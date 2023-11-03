import { Request, Response, NextFunction } from "express";

const successMiddleware = (
  data: any[], // Assuming data is an array of some type
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const {
    TotalCount,
    TotalPages,
    skip,
    limit,
    HasNextPage,
    HasPrevPage,
    status,
    message,
    error,
    single,
  } = data[0];

  let resData = data.slice(1);

  return res.status(status).json({
    status,
    message,
    error: error === 1,
    total: single ? undefined : resData.length,
    data: resData.length === 0 ? undefined : single ? resData[0] : resData,
    pagination: single
      ? undefined
      : resData.length === 0
      ? undefined
      : {
          limit,
          skip,
          totalDocs: TotalCount,
          totalPages: TotalPages,
          hasPrevPage: HasPrevPage === 1,
          hasNextPage: HasNextPage === 1,
        },
  });
};

export default successMiddleware;
