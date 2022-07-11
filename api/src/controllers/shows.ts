import prisma from "../utils/prisma";
import { HTTPError, HttpStatusCode, route } from "../utils/utilities";

export const addShow = route(async (req, res) => {
  const { title, app, rating, review } = req.body;
  if (!title || !app || !rating || !review)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "Fields missing");

  const show = await prisma.show.create({
    data: { title, app, rating, review, userId: req.user?.id as string },
  });
  res.status(200).json({
    message: "Show added successfully",
    show,
  });
});

export const getUserShows = route(async (req, res) => {
  const shows = await prisma.show.findMany({
    where: { userId: req.user?.id as string },
  });

  res.status(200).json({
    shows,
  });
});

export const editShow = route(async (req, res) => {
  const { showId, title, app, rating, review } = req.body;
  if (!showId || !title || !app || !rating || !review)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "Fields missing");

  const check = await prisma.show.findUnique({ where: { id: showId } });
  if (check?.userId !== req.user?.id)
    throw new HTTPError(HttpStatusCode.FORBIDDEN, "User cannot edit this show");

  const show = await prisma.show.update({
    where: { id: showId },
    data: { title, app, rating, review, userId: req.user?.id as string },
  });

  res.status(200).json({
    message: "Show updated successfully",
    show,
  });
});

export const deleteShow = route(async (req, res) => {
  const { showId } = req.body;
  if (!showId)
    throw new HTTPError(HttpStatusCode.BAD_REQUEST, "Fields missing");

  const check = await prisma.show.findUnique({ where: { id: showId } });
  if (check?.userId !== req.user?.id)
    throw new HTTPError(
      HttpStatusCode.FORBIDDEN,
      "User cannot delete this show"
    );

  await prisma.show.delete({ where: { id: showId } });

  res.status(200).json({
    message: "Show deleted successfully",
  });
});
