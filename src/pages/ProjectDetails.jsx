import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import {
  createProject,
  deleteGarbageImages,
  deleteProject,
  getCategories,
  getProjectDetails,
  updateProject,
} from "../api/api";
import { MoonLoader } from "react-spinners";
import { useEffect } from "react";
import AddCoverImg from "../component/AddCoverImg";
import AddThumbNail from "../component/AddThumbNail";
import AddImagesGallery from "../component/AddImagesGallery";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
import { getDifference } from "../helper/helperFunction";
import axios from "axios";
import { updateNotification } from "../App";
export const ProjectDetailContext = createContext();

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [disabled, setDisabled] = useState({
    cover: true,
    details: true,
    gallery: true,
  });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    id: "",
    name: "",
    location: "",
    area: "",
    date: "",
    description: "",
    poster: "",
    thumbnail: "",
    gallery: [],
  });

  useEffect(() => {
    setCount(count + 1);
  }, [project]);

  useEffect(() => {
    getProjectDetails(id).then((res) => {
      setProject(res);
      setCount(0);
      setLoading(false);
    });
  }, []);

  let { data } = useQuery("categories", getCategories);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (count <= 1) {
      return;
    }

    const garbageImages = await JSON.parse(
      localStorage.getItem("garbageImages")
    );
    const usedImages = [project.poster, project.thumbnail, ...project.gallery];
    let deleteImages;

    if (garbageImages == null) {
      deleteImages = [];
    } else {
      deleteImages = await getDifference(usedImages, garbageImages);
    }

    await updateProject(project)
      .then((res) => {
        if (deleteImages.length !== 0) {
          deleteGarbageImages(deleteImages).then((res) => {
            localStorage.removeItem("garbageImages");
          });
        }
        setCount(0);

        updateNotification("Project Updated successfully", "info");
      })
      .catch((error) => updateNotification(error.message, "error"));
  };

  const handleDelete = async () => {
    const deleteImageArr = [
      project.poster,
      project.thumbnail,
      ...project.gallery,
    ];
    await deleteProject(project.id)
      .then((x) => {
        deleteGarbageImages(deleteImageArr);
        updateNotification("Project Deleted Successfully", "success");
        setTimeout(() => {
          navigate("/projects");
        }, 500);
      })
      .catch((err) => updateNotification(err.message, "error"));
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <MoonLoader color="#36d7b7" />{" "}
      </div>
    );
  }
  return (
    <>
      {confirmDelete && (
        <>
          <div
            className="fixed w-full h-full bg-black/50 z-30 flex items-center justify-center"
            onClick={() => setConfirmDelete(!confirmDelete)}
          ></div>
          <div className="fixed bg-white w-fit h-fit px-4 py-4 rounded-md  z-30 inset-0 m-auto ">
            <img src={project.thumbnail.url} className="w-28 mx-auto" alt="" />
            <p className="text-center w-full text-lg font-semibold">
              {project.name}
            </p>
            <p>Are you sure you want to delete this project ?</p>
            <span
              className="absolute right-2 top-2 hover:bg-slate-200 active:bg-slate-300 p-2 cursor-pointer rounded-full"
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              <GrClose size={20} />
            </span>
            <span className="flex justify-center pt-2 gap-2">
              <button
                className="bg-red-600 text-white py-1 px-2 rounded-md font-semibold"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-slate-600 text-white py-1 px-2 rounded-md font-semibold"
                onClick={() => setConfirmDelete(!confirmDelete)}
              >
                Cancel
              </button>
            </span>
          </div>
        </>
      )}

      <ProjectDetailContext.Provider value={{ project, setProject }}>
        <div className="px-10 py-20 bg-slate-100">
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            <div
              className={`bg-white  float-left	w-full   py-2 border-2 ${
                disabled.cover ? "border-white" : "border-blue-400"
              } rounded-md px-4 `}
            >
              <h1 className="mb-2 border-b pb-2 px-2 border-slate-300 flex items-center justify-between ">
                <p>Cover Photo</p>
                {disabled.cover ? (
                  <button
                    className="py-1 border-white border"
                    onClick={() => setDisabled({ ...disabled, cover: false })}
                  >
                    <AiFillEdit size={24} />
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-2 border border-slate-600 text-slate-600 px-2 py-1 rounded-md font-semibold hover:text-white hover:bg-slate-600"
                    onClick={() => {
                      setDisabled({ ...disabled, cover: true });
                      handleUpdate(project);
                    }}
                  >
                    <AiFillSave size={20} />
                    Save
                  </button>
                )}
              </h1>
              <AddCoverImg
                data={{ project, setProject }}
                disabled={disabled.cover}
              />
            </div>
            <div
              className={`flex flex-col lg:w-96 w-full py-2 px-4  border-2 ${
                disabled.details ? "border-white" : "border-blue-400"
              } rounded-md bg-white`}
            >
              <h1 className="  border-b border-slate-300 pb-2 px-2 mb-2 flex items-center justify-between">
                <p>Project Details</p>
                {disabled.details ? (
                  <button
                    className="py-1 border-white border"
                    onClick={() => setDisabled({ ...disabled, details: false })}
                  >
                    <AiFillEdit size={24} />
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-2 border border-slate-600 text-slate-600 px-2 py-1 rounded-md font-semibold hover:text-white hover:bg-slate-600"
                    onClick={() => {
                      setDisabled({ ...disabled, details: true });
                      handleUpdate(project);
                    }}
                  >
                    <AiFillSave size={20} />
                    Save
                  </button>
                )}
              </h1>
              <AddThumbNail
                data={{ project, setProject }}
                disabled={disabled.details}
              />
              <div className="mt-2 [&_input]:border-slate-400 [&_input]:border-2 [&_input]:rounded-md [&_input]:w-full [&_input]:px-2 [&_input]:bg-white [&_input]:py-1 [&_input]:outline-none [&_input]:my-1 [&_input]:disabled:opacity-75">
                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  onChange={handleChange}
                  className="focus:border-2 focus:border-blue-500 disabled:border-slate-200"
                  value={project.name}
                  disabled={disabled.details}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Project Location"
                  onChange={handleChange}
                  className="focus:border-2 focus:border-blue-500 disabled:border-slate-200"
                  value={project.location}
                  disabled={disabled.details}
                />
                <input
                  type="number"
                  name="area"
                  placeholder="Sqft Area"
                  onChange={handleChange}
                  className="focus:border-2 focus:border-blue-500 disabled:border-slate-200"
                  value={project.area}
                  disabled={disabled.details}
                />
                <input
                  type="date"
                  name="date"
                  placeholder="date of Completion"
                  onChange={handleChange}
                  className="focus:border-2 focus:border-blue-500 disabled:border-slate-200"
                  value={project.date}
                  disabled={disabled.details}
                />

                <select
                  name="type"
                  id=""
                  className="px-2 py-1 outline-none border-2 border-slate-400 my-1 rounded-md w-full focus:border-blue-500 disabled:border-slate-200"
                  disabled={disabled.details}
                  onChange={handleChange}
                  value={project.type}
                >
                  <option value="" className="bg-slate-200">
                    Select Project type
                  </option>
                  {data?.category.map((x) => (
                    <option key={x.id} value={x.name}>
                      {x.name}
                    </option>
                  ))}
                </select>
                <textarea
                  className="outline-none focus:border-blue-400 border-slate-400 border-2 w-full rounded-md p-2 mt-1 disabled:border-slate-200"
                  type="text"
                  name="description"
                  placeholder="Project Description"
                  onChange={handleChange}
                  disabled={disabled.details}
                />
              </div>
            </div>
          </div>
          <div
            className={`border-2 ${
              disabled.gallery ? "border-white" : "border-blue-400"
            }  bg-white rounded-lg mt-4 pb-2`}
          >
            <h1 className="border-b border-slate-300 py-2 px-2 mx-4 flex items-center justify-between">
              <p>Gallery</p>
              {disabled.gallery ? (
                <button
                  className="py-1 border-white border"
                  onClick={() => setDisabled({ ...disabled, gallery: false })}
                >
                  <AiFillEdit size={24} />
                </button>
              ) : (
                <button
                  className="flex items-center justify-center gap-2 border border-slate-600 text-slate-600 px-2 py-1 rounded-md font-semibold hover:text-white hover:bg-slate-600"
                  onClick={() => {
                    setDisabled({ ...disabled, gallery: true });
                    handleUpdate(project);
                  }}
                >
                  <AiFillSave size={20} />
                  Save
                </button>
              )}
            </h1>

            <AddImagesGallery
              data={{ project, setProject }}
              disabled={disabled.gallery}
            />
          </div>
          <div className="w-full py-4 flex justify-around ">
            <button
              className=" mx-auto bg-red-500 px-3 py-2 text-white font-semibold rounded-md flex items-center gap-1 hover:bg-red-600"
              onClick={() => setConfirmDelete(!confirmDelete)}
            >
              <MdDelete /> DELETE
            </button>
          </div>
        </div>
      </ProjectDetailContext.Provider>
    </>
  );
};

export default ProjectDetails;
