import React from 'react';
import type { Course } from '../types';
import { CourseCard } from './CourseCard';

interface CourseListProps {
  courses: Course[];
  onJoinCourse: (course: Course) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, onJoinCourse }) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {courses.map(course => (
        <CourseCard 
          key={course.id} 
          course={course} 
          onJoin={onJoinCourse} 
        />
      ))}
    </div>
  );
};
