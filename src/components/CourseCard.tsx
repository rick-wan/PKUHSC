import React from 'react';
import type { Course } from '../types';
import { cn } from '../lib/utils';
import { Users, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onJoin: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onJoin }) => {
  const isFull = course.occupiedSpots >= course.totalSpots;
  const progressPercentage = Math.min((course.occupiedSpots / course.totalSpots) * 100, 100);

  return (
    <div className="group bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center border border-gray-100 hover:border-aurora-highlight/30 transition-all hover:shadow-xl hover:shadow-aurora-highlight/5 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-aurora-highlight/5 rounded-full blur-3xl group-hover:bg-aurora-highlight/10 transition-colors pointer-events-none"></div>

      {/* Cover Image */}
      <div className="w-full md:w-64 h-48 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm relative z-10">
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase",
            isFull ? "bg-gray-100 text-gray-400" : "bg-aurora-highlight/10 text-aurora-highlight"
          )}>
            {isFull ? '已满' : '可选'}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-aurora-text mb-3 group-hover:text-aurora-highlight transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl">
          {course.description}
        </p>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Users className="w-4 h-4 text-aurora-highlight" />
            <span>{course.occupiedSpots} / {course.totalSpots} 已报名</span>
          </div>
          <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
             <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000 ease-out",
                  isFull ? "bg-gray-300" : "bg-aurora-highlight"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 relative z-10">
        <button
          onClick={() => !isFull && onJoin(course)}
          disabled={isFull}
          className={cn(
            "h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300",
            isFull 
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-aurora-text text-white hover:bg-aurora-highlight hover:scale-110 shadow-lg"
          )}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
