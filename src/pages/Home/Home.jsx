import { Menu } from "../../components/Menu/Menu";

import { BiDotsHorizontalRounded, BiX } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";

import "./Home.scss";
import { HashLoader } from "react-spinners";

const Home = () => {
  // Get data State
  const [adminData, setAdminData] = useState([]);

  // image upload loading
  const [loading, setLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // preview Image state
  const [images, setImages] = useState([]);

  // handleInputChange
  const handleInputChange = (e) => {
    setImages((prevState) => [...prevState, ...Array.from(e.target.files)]);
  };

  // Image preview delete btn
  const handleImgCloseBtn = (item) => {
    const updatedList = images.filter((data) => data !== item);
    setImages(updatedList);
  };

  // Image submit Btn
  const handleNextBtn = () => {
    setLoading(true);
    const data = new FormData();
    images.forEach((item) => {
      data.append("file", item);
      data.append("cloud_name", "do6dt1ot2");
      data.append("upload_preset", "sorobindu-2");
      axios
        .post("https://api.cloudinary.com/v1_1/do6dt1ot2/image/upload", data)
        .then((res) => {
          setAdminData((prevState) => [...prevState, res.data.url]);
          axios
            .post("http://localhost:5050/post", { post_img: res.data.url })
            .then((res) => {
              axios
                .get("http://localhost:5050/post?_sort=id&_order=desc")
                .then((res) => {
                  setAdminData(res.data);
                  setLoading(false);
                });
            });

          setImages([]);
        });
    });
    setShowModal(false);
  };

  // useEffect
  useEffect(() => {
    axios.get("http://localhost:5050/post?_sort=id&_order=desc").then((res) => {
      setAdminData(res.data);
    });
  }, [setAdminData]);

  return (
    <>
      {/* ==================== Home Page===================== */}
      <div className="home">
        {loading && (
          <h1 className="loader">
            <span>
              <HashLoader color="#ffffff" />
            </span>
          </h1>
        )}

        <div className="content">
          <div className="row">
            {/* ==================== Menu ===================== */}
            {showModal && (
              <Modal hide={setShowModal} setImages={setImages}>
                <div className="model-top">
                  <h3>Create a new post</h3>
                  {images.length > 0 ? (
                    <div className="image_preview shadow-sm">
                      <div className="row">
                        {images.map((item, index) => {
                          const imgURL = URL.createObjectURL(item);
                          return (
                            <div className="col-md-12" key={index}>
                              <div className="preview">
                                <img src={imgURL} alt="" />
                                <button onClick={() => handleImgCloseBtn(item)}>
                                  X
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={handleNextBtn}
                        className="btn btn-primary btn-sm w-100 nextBtn"
                      >
                        next
                      </button>
                    </div>
                  ) : (
                    <div className="image_upload">
                      <span>
                        <svg
                          aria-label="Icon to represent media such as images or videos"
                          class="_ab6-"
                          color="#262626"
                          fill="#262626"
                          height="77"
                          role="img"
                          viewBox="0 0 97.6 77.3"
                          width="96"
                        >
                          <path
                            d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <p>Drag photos and videos here</p>
                      <label className="upload_label" htmlFor="upload_file">
                        Select form computer
                      </label>
                      <input
                        onChange={handleInputChange}
                        style={{ display: "none" }}
                        id="upload_file"
                        type="file"
                        multiple
                      />
                    </div>
                  )}
                </div>
              </Modal>
            )}
            <div className="col-md-2 home-menu-show">
              <Menu setShowModal={setShowModal} />
            </div>

            {/* ==================== Body ===================== */}

            <div className="col-md-10">
              <div className="content-1">
                <div className="row">
                  {/* ==================== Left Bar Start ===================== */}
                  <div className="left-area">
                    {/* ==================== Story Area Start ===================== */}
                    <div className="story-area">
                      <div className="content">
                        <div className="row">
                          <div className="story-box">
                            <img
                              src="https://powerpackelements.com/wp-content/uploads/2017/11/Team-memeber-01.png"
                              alt=""
                            />
                            <p>shajib</p>
                          </div>
                          <div className="story-box">
                            <img
                              src="https://energaia.com/wp-content/uploads/2020/10/team-member-8.jpg"
                              alt=""
                            />
                            <p>rakib</p>
                          </div>
                          <div className="story-box">
                            <img
                              src="https://billey.thememove.com/wp-content/uploads/2019/08/team-member-01.jpg"
                              alt=""
                            />
                            <p>jhon</p>
                          </div>
                          <div className="story-box">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iCMKKj8lTp440PMszx6HZS6JgT8EW2nrzw&usqp=CAU"
                              alt=""
                            />
                            <p>smith</p>
                          </div>
                          <div className="story-box">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl73wITeOyQVUhGxR1-JrlRRQLZdjfLNfZQ&usqp=CAU"
                              alt=""
                            />
                            <p>shovo</p>
                          </div>
                          <div className="story-box">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6fqVp-HX-Y9jA10_Wm4RSIBFV4vlD0sXo7Q&usqp=CAU"
                              alt=""
                            />
                            <p>sarif</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ==================== Post Area Start ===================== */}

                    {adminData.length > 0 ? (
                      <>
                        {adminData.reverse().map((item, index) => (
                          <div className="post-area" key={index}>
                            <div className="top-info">
                              <div className="top-info-left">
                                <a href="#">
                                  <img
                                    src="https://www.shutterstock.com/image-photo/smiling-african-american-office-employee-260nw-1032686038.jpg"
                                    alt=""
                                  />
                                </a>
                                <div className="post-text-area">
                                  <a href="#">sunhail_shajib</a>
                                  <span>
                                    <BsDot />
                                    14h
                                  </span>
                                </div>
                              </div>

                              <button>
                                <BiDotsHorizontalRounded />
                              </button>
                            </div>
                            <img
                              className="post-img"
                              src={item.post_img}
                              alt=""
                            />
                            <div className="post-feedback-icon">
                              <div className="left-side-icon">
                                <button>
                                  <svg
                                    aria-label="Like"
                                    class="_ab6-"
                                    color="#262626"
                                    fill="#262626"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                  </svg>
                                </button>
                                <button>
                                  <svg
                                    aria-label="Comment"
                                    class="_ab6-"
                                    color="#8e8e8e"
                                    fill="#8e8e8e"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <path
                                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                    ></path>
                                  </svg>
                                </button>
                                <button>
                                  <svg
                                    aria-label="Share Post"
                                    class="_ab6-"
                                    color="#8e8e8e"
                                    fill="#8e8e8e"
                                    height="24"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="24"
                                  >
                                    <line
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      x1="22"
                                      x2="9.218"
                                      y1="3"
                                      y2="10.083"
                                    ></line>
                                    <polygon
                                      fill="none"
                                      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                      stroke="currentColor"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                    ></polygon>
                                  </svg>
                                </button>
                              </div>

                              <button>
                                <svg
                                  aria-label="Save"
                                  class="_ab6-"
                                  color="#8e8e8e"
                                  fill="#8e8e8e"
                                  height="24"
                                  role="img"
                                  viewBox="0 0 24 24"
                                  width="24"
                                >
                                  <polygon
                                    fill="none"
                                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                  ></polygon>
                                </svg>
                              </button>
                            </div>
                            <div className="post-caption-info">
                              <p>600 likes</p>
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Dolorum modi dolores cum
                                distinctio officiis odit.
                              </p>
                              <span>View all comments</span>
                              <div className="comment-box">
                                <input
                                  type="text"
                                  placeholder="Add a comment..."
                                />
                                <button>
                                  <svg
                                    aria-label="Emoji"
                                    class="_ab6-"
                                    color="#c7c7c7"
                                    fill="#c7c7c7"
                                    height="13"
                                    role="img"
                                    viewBox="0 0 24 24"
                                    width="13"
                                  >
                                    <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <hr />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="card shadow">
                        <div className="card-bod text-center">
                          <h5
                            style={{
                              backgroundColor: "#ddd",
                              margin: "0px",
                              padding: "10px 0px",
                            }}
                          >
                            No Post Found!
                          </h5>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ==================== Right Bar ===================== */}
                  <div className="right-area">
                    <div className="profile-wrapper">
                      <div className="profile-bar">
                        <a href="#">
                          <img
                            src="https://www.shutterstock.com/image-photo/smiling-african-american-office-employee-260nw-1032686038.jpg"
                            alt=""
                          />
                        </a>
                        <div className="profile-info">
                          <a href="#">
                            <p>sunhail_shajib</p>
                          </a>
                          <span>shajib</span>
                        </div>
                      </div>
                      <button>Switch</button>
                    </div>

                    <div className="suggest-wrapper">
                      <div className="suggest-bar">
                        <p>Suggestions for you</p>
                      </div>
                      <button>See All</button>
                    </div>

                    <div className="suggest-friend">
                      <div className="suggest-frd-bar">
                        <a href="#">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrqXFfbBOMblq8_B3dVobrEXdm-4q_H2ilQdsCllYoSulEuP0t2VK4b11bHqIWMRhGww&usqp=CAU"
                            alt=""
                          />
                        </a>
                        <div className="suggest-frd-info">
                          <a href="#">
                            <p>mostakim_hasan</p>
                          </a>
                          <span>New to Instragram</span>
                        </div>
                      </div>
                      <button>Switch</button>
                    </div>
                    <div className="suggest-friend">
                      <div className="suggest-frd-bar">
                        <a href="#">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrqXFfbBOMblq8_B3dVobrEXdm-4q_H2ilQdsCllYoSulEuP0t2VK4b11bHqIWMRhGww&usqp=CAU"
                            alt=""
                          />
                        </a>
                        <div className="suggest-frd-info">
                          <a href="#">
                            <p>mostakim_hasan</p>
                          </a>
                          <span>New to Instragram</span>
                        </div>
                      </div>
                      <button>Switch</button>
                    </div>
                    <div className="suggest-friend">
                      <div className="suggest-frd-bar">
                        <a href="#">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrqXFfbBOMblq8_B3dVobrEXdm-4q_H2ilQdsCllYoSulEuP0t2VK4b11bHqIWMRhGww&usqp=CAU"
                            alt=""
                          />
                        </a>
                        <div className="suggest-frd-info">
                          <a href="#">
                            <p>mostakim_hasan</p>
                          </a>
                          <span>New to Instragram</span>
                        </div>
                      </div>
                      <button>Switch</button>
                    </div>
                    <div className="suggest-friend">
                      <div className="suggest-frd-bar">
                        <a href="#">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLrqXFfbBOMblq8_B3dVobrEXdm-4q_H2ilQdsCllYoSulEuP0t2VK4b11bHqIWMRhGww&usqp=CAU"
                            alt=""
                          />
                        </a>
                        <div className="suggest-frd-info">
                          <a href="#">
                            <p>mostakim_hasan</p>
                          </a>
                          <span>New to Instragram</span>
                        </div>
                      </div>
                      <button>Switch</button>
                    </div>

                    {/* ==================== Footer Menu ===================== */}

                    <div className="footer-menu">
                      <div className="footer-wrapper">
                        <ul>
                          <li>
                            <a href="#">About</a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Help
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Press
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              API
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Jobs
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Privacy
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Terms
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Locations
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <BsDot />
                              Language
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="footer-bottom">
                        <p>© 2023 INSTAGRAM FROM META</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
