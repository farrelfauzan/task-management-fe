import { useSelector } from "react-redux";
import { commentsData, getComments } from "../../lib/features/comment/comment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateCommentDto } from "../../swagger/api";
import { Send } from "lucide-react";

const CommentSection = () => {
  const dispatch = useDispatch();
  const comments = useSelector(commentsData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentDto>();

  const onSubmit: SubmitHandler<CreateCommentDto> = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await dispatch(getComments());

        if (response.error) {
          throw new Error("Failed to fetch comments");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchComments();
  }, []);
  return (
    <div className="w-full">
      <div className="flex justify-center items-center text-lg font-semibold">
        Comment Section
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="w-full">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Comment
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            type="text"
            id="content"
            {...register("content")}
          />
          <button
            type="submit"
            className="flex mt-2 bg-blue-300 px-5 py-2 rounded-md"
          >
            <Send className="mr-2" />
            Send
          </button>
        </div>
      </form>
      <div className="mt-8">
        <div>Comments</div>
        {comments.length === 0 && (
          <div className="flex justify-center text-orange-400/70 mt-8">
            No comments available
          </div>
        )}
        {comments.map((comment: any) => (
          <div className="mt-8" key={comment.id}>
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
