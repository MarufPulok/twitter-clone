import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import styles from "../styles/input.module.css";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useRouter } from "next/router";

const Input = ({ updatePosts }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedImages, setSelectedImages] = useState([]);
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [dp, setDp] = useState(null);
  const email = session?.user?.email;

  useEffect(() => {
    const fetchDp = async () => {
      const res = await fetch(`/api/users/getUser?email=${email}`);
      const data = await res.json();
      setDp(data?.user[0]?.dp);
    };
    fetchDp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", session.user.email);
    formData.append("text", tweet);
    selectedImages.forEach((image) => {
      formData.append("postImages", image);
    });
    const res = await fetch("/api/users/createTweet", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    updatePosts(data.newTweet);
    setTweet("");
    setSelectedImages([]);
    setLoading(false);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  return (
    <>
      {session && session.user && (
        <div className={styles.inputContainer}>
          {dp ? (
            <Image
              src={`/images/${dp}`}
              className={styles.inputImg}
              height="50"
              width="50"
              alt="user-image"
              onClick={() => {
                router.push("/auth/profile");
              }}
            />
          ) : (
            <Image
              src="/default.png"
              className={styles.inputImg}
              height="50"
              width="50"
              alt="user-image"
              onClick={signOut}
            />
          )}
          <div className={styles.inputFieldContainer}>
            <div>
              <textarea
                className={styles.inputField}
                rows="2"
                placeholder="What's happening?"
                value={tweet}
                onChange={(e) => {
                  setTweet(e.target.value);
                }}
              />
            </div>
            <div className={styles.inputIconContainer}>
              <div>
                <label htmlFor="image-upload" className={styles.customButton}>
                  <PhotographIcon className={styles.inputIcon} />
                </label>
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  onChange={({ target }) => {
                    const files = target.files;
                    const newImages = [...selectedImages];
                    for (let i = 0; i < files.length; i++) {
                      newImages.push(files[i]);
                    }
                    setSelectedImages(newImages);
                  }}
                  multiple
                />
                <EmojiHappyIcon className={`${styles.inputIcon} hoverEffect`} />
              </div>
              {selectedImages.length > 0 && (
                <div className={styles.selectedImagesContainer}>
                  {selectedImages.map((selectedImage, index) => (
                    <div key={index} className={styles.selectedImageContainer}>
                      <Image
                        width={300}
                        height={30}
                        src={URL.createObjectURL(selectedImage)}
                        className={styles.selectedImage}
                        alt="Selected Image"
                      />
                      <button
                        className={styles.removeImageButton}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                className={`tweetButton ${styles.postBtn}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Tweeting..." : "Tweet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
