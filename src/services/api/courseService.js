import { getApiUrl } from "./client";

export async function getCourses() {
  const response = await fetch(getApiUrl("/courses"));
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}

export async function getCourseById(id) {
  const response = await fetch(getApiUrl(`/courses/${id}`));
  if (!response.ok) {
    throw new Error("Failed to fetch course");
  }
  return response.json();
}

export async function createCourse(course) {
  const response = await fetch(getApiUrl("/courses"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(course)
  });
  if (!response.ok) {
    throw new Error("Failed to create course");
  }
  return response.json();
}

export async function updateCourse(id, course) {
  const response = await fetch(getApiUrl(`/courses/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(course)
  });
  if (!response.ok) {
    throw new Error("Failed to update course");
  }
  return response.json();
}

export async function deleteCourse(id) {
  const response = await fetch(getApiUrl(`/courses/${id}`), {
    method: "DELETE"
  });
  if (!response.ok) {
    throw new Error("Failed to delete course");
  }
  return true;
}
