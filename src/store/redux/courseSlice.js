import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    },
    addCourse: (state, action) => {
      state.data.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.data.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      state.data = state.data.filter(course => course.id !== action.payload);
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const { setCourses, addCourse, updateCourse, deleteCourse, setLoading, setError } = courseSlice.actions;

export default courseSlice.reducer;
