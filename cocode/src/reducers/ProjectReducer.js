// 참고: https://github.com/dal-lab/frontend-tdd-examples/blob/master/6-todo-redux/src/reducers.js
import {
  UPDATE_CODE,
  FETCH_PROJECT,
  SELECT_FILE,
  CREATE_FILE,
  UPDATE_FILE_NAME
} from "actions/types";

import { getFileExtension } from "utils";
import FileImagesSrc from "constants/fileImagesSrc";

// fetchProject
const fetchProject = (_, { project }) => {
  const filesObject = project.files.reduce((acc, cur) => {
    acc[cur._id] = cur;
    return acc;
  }, {});

  const rootDirectoryId = project.root;
  const convertedFilesObject = addParentIdToFiles(filesObject, rootDirectoryId);
  Object.assign(convertedFilesObject, {
    [rootDirectoryId]: { ...filesObject[rootDirectoryId] }
  });

  const entryId = project.entry;
  const fetchedProject = {
    ...project,
    files: convertedFilesObject,
    selectedFileId: entryId,
    editingCode: convertedFilesObject[entryId].contents
  };

  return fetchedProject;
};

function addParentIdToFiles(filesObject, directoryId) {
  const result =
    directoryId === filesObject.root
      ? { [directoryId]: { ...filesObject[directoryId] } }
      : {};

  return filesObject[directoryId].child.reduce((files, id) => {
    const file = filesObject[id];
    file["parentId"] = directoryId;

    const child = file.child ? { ...addParentIdToFiles(filesObject, id) } : {};
    const thisFile = { [id]: file };

    return { ...files, ...thisFile, ...child };
  }, result);
}

const updateCode = (state, { changedCode }) => {
  return {
    ...state,
    files: {
      ...state.files,
      [state.selectedFileId]: {
        ...state.files[state.selectedFileId],
        contents: changedCode
      }
    }
  };
};

const selectFile = (state, { selectedFileId }) => {
  return {
    ...state,
    selectedFileId,
    editingCode: selectedFileId
      ? state.files[selectedFileId].contents
      : undefined
  };
};

const createFile = (state, { name, parentId, type }) => {
  const newFileId = name; // TODO: ObjectId생성 모듈로 생성한 것
  const newFileType = type === "directory" ? type : convertFileExtension(name);

  const newFile = {
    [newFileId]: {
      _id: newFileId,
      name,
      type: newFileType,
      contents: "",
      parentId
    }
  };
  if (newFileType === "directory") newFile[newFileId]["child"] = [];

  // 변경되는 state: 부모 디렉토리의 child
  return {
    ...state,
    files: {
      ...state.files,
      ...newFile,
      [parentId]: {
        ...state.files[parentId],
        child: [...state.files[parentId].child, newFileId]
      }
    }
  };
};

function convertFileExtension(name) {
  let ext = getFileExtension(name);
  if (!FileImagesSrc[ext]) ext = "file";
  return ext;
}

const updateFileName = (state, { selectedFileId, changedName }) => {
  return {
    ...state,
    files: {
      ...state.files,
      [selectedFileId]: {
        ...state.files[selectedFileId],
        name: changedName
      }
    }
  };
};

function ProjectReducer(state, { type, payload }) {
  const reducers = {
    [FETCH_PROJECT]: fetchProject,
    [UPDATE_CODE]: updateCode,
    [SELECT_FILE]: selectFile,
    [UPDATE_FILE_NAME]: updateFileName,
    [CREATE_FILE]: createFile
  };

  const reducer = reducers[type];
  return reducer ? reducer(state, payload) : state;
}

export default ProjectReducer;
