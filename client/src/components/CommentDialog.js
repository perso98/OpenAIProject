import React, { useState, useEffect, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, InputAdornment } from "@mui/material";
import { addComment, getComments, deleteComment } from "../utils/api";
import { AuthContext } from "../providers/AuthProvider ";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import "../App.css";

function CommentDialog(props) {
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(props.pictureId, setComments, props.setLoading);
  }, [props.pictureId]);

  return props.open ? (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle className="dialog-title-comment">
        {" "}
        Comments{" "}
        <IconButton onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="dialog-container">
          {props.loading ? (
            <div className="circual-div">
              <CircularProgress color="inherit" style={{ margin: "auto" }} />
            </div>
          ) : comments.length ? (
            comments.map((val) => (
              <div className="comment-container">
                <div className="user-comment-info">
                  <div className="creator-container">
                    {val.User.id === val.Picture.UserId ? <StarIcon /> : null}
                    <div
                      style={{
                        fontWeight: user.id === val.UserId ? "bold" : "normal",
                      }}
                    >
                      {val.User.login}
                    </div>
                  </div>

                  <div className="time-info-comment">
                    {val.createdAt.replace("T", " ").slice(0, 19)}
                  </div>
                </div>
                <div className="comment">
                  <div
                    className="comment-style"
                    style={{
                      background:
                        user.id === val.UserId ? "#1d1f20" : "#383838",
                    }}
                  >
                    {val.text}
                  </div>
                  {user.id === val.UserId ? (
                    <IconButton
                      onClick={() =>
                        deleteComment(val.id, setComments, comments)
                      }
                    >
                      <ClearIcon style={{ color: "red" }} />
                    </IconButton>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div>There is no comments add first comment below</div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {user ? (
          <TextField
            label="Comment text"
            className="chat-input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            multiline
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="success"
                    className="chat-send-btn"
                    startIcon={<SendIcon />}
                    onClick={() => {
                      addComment(props.pictureId, text, setComments, comments);
                      setText("");
                    }}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <TextField
            label="Log in to add comment"
            disabled={true}
            className="chat-input"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="success"
                    className="chat-send-btn"
                    startIcon={<SendIcon />}
                    disabled={true}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        )}
      </DialogActions>
    </Dialog>
  ) : null;
}

export default CommentDialog;
