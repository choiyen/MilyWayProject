import { paths } from "@/config/paths/paths";
import { GET, POST } from "@/config/request/axios/axiosInstance";
export const BoardPOST = async (boardId) => {
    return await GET({
        url: paths.forum.Board.param.path,
        params: {
            BoardId: boardId,
        },
    });
};
export const CommentPOST = async (boardId) => {
    return await GET({
        url: paths.forum.Comment.search.Board.path,
        params: {
            BoardId: boardId,
        },
    });
};
export const CommentInsert = async (input) => {
    return await POST({
        url: paths.forum.Comment.basic.path,
        data: {
            boardId: input.boardId,
            type: input.type,
            comment: input.comment,
            password: input.password,
        },
    });
};
export const DateUpdate = (isoString) => {
    const date = new Date(isoString);
    const formatted = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일 ` +
        `${String(date.getHours()).padStart(2, "0")}시 ${String(date.getMinutes()).padStart(2, "0")}분 ${String(date.getSeconds()).padStart(2, "0")}초`;
    return formatted;
};
