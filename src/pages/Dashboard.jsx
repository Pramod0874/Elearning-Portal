import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, getProgress } from '../utils/storage';
import { courses } from '../utils/mockData';
import { BookOpen, Trophy } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    setUser(currentUser);

    const progress = getProgress();
    const enrolled = courses.filter(course => progress[course.id]?.enrolled).map(course => {
      const courseProgress = progress[course.id];
      const percent = Math.round((courseProgress.completedModules.length / course.modules.length) * 100);
      return { ...course, progressInfo: courseProgress, percent };
    });
    setEnrolledCourses(enrolled);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 style={{ marginBottom: '0.25rem', fontSize: '2.5rem' }}>Welcome back, {user.name}</h1>
          <p className="text-secondary">{user.email}</p>
        </div>
      </div>

      <h2 style={{ marginBottom: '2rem' }}>My <span className="text-gradient">Learning Journey</span></h2>
      
      {enrolledCourses.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
          <BookOpen size={48} className="text-secondary" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ marginBottom: '1rem' }}>You haven't enrolled in any courses yet.</h3>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>Explore our catalog and start learning today!</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div className="grid-cols-2">
          {enrolledCourses.map(course => (
            <div className="glass-card" key={course.id} style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <img src={course.image} alt={course.title} style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    {course.percent === 100 ? 'Completed' : `${course.progressInfo.completedModules.length} of ${course.modules.length} lessons`}
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                  <span>Progress</span>
                  <span className="text-gradient">{course.percent}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-fill" style={{ width: `${course.percent}%` }}></div>
                </div>
              </div>

              {course.percent === 100 && course.progressInfo.score !== null ? (
                <div style={{ background: 'rgba(20, 184, 166, 0.1)', border: '1px solid var(--brand-accent)', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-accent)', fontWeight: 600 }}>
                    <Trophy size={20} /> Assessment Score
                  </div>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--brand-accent)' }}>{course.progressInfo.score}%</strong>
                </div>
              ) : null}

              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                <Link to={`/courses/${course.id}`} className="btn btn-primary" style={{ flex: 1 }}>
                  {course.percent === 100 ? 'Review Course' : (course.percent > 0 ? 'Continue' : 'Start Course')}
                </Link>
                {course.percent === 100 && course.progressInfo.score === null && (
                  <Link to={`/assessment/${course.id}`} className="btn btn-secondary" style={{ flex: 1 }}>
                    Take Quiz
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
