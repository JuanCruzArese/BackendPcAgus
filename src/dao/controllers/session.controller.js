import userDto from "../dtos/user.dto.js";

export const getCurrentUser = (req, res) => {
    const user = new userDto(req.user);
    res.send(user.getCurrentUser());
}