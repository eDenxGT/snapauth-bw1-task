import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string)?.trim() || "";
    const skip = (page - 1) * limit;

    const searchQuery = search
      ? { email: { $regex: search, $options: "i" } }
      : {};

    const [users, total] = await Promise.all([
      UserModel.find(searchQuery).skip(skip).limit(limit),
      UserModel.countDocuments(searchQuery),
    ]);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      totalUsers: total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
