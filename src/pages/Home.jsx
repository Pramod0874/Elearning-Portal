import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Trophy } from 'lucide-react';
import { courses } from '../utils/mockData';

export default function Home() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container text-center" style={{ padding: '4rem 0', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--brand-primary)', borderRadius: '20px', fontWeight: 600, marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Welcome to the Future of Learning
        </div>
        <h1 style={{ fontSize: '4rem', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          Unlock Your Potential with <span className="text-gradient">EduVerse</span>
        </h1>
        <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          Master modern skills through interactive courses, track your progress, and take assessments to validate your knowledge.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/courses" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Explore Courses <ArrowRight size={20} />
          </Link>
          <Link to="/auth" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Create Account
          </Link>
        </div>
      </section>

      {/* Features Outline */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div className="grid-cols-3">
          <div className="glass-card text-center">
            <div style={{ width: '60px', height: '60px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: 'var(--brand-primary)' }}>
              <BookOpen size={30} />
            </div>
            <h3>Premium Courses</h3>
            <p className="text-secondary">Access expertly crafted content with video and text modules.</p>
          </div>
          <div className="glass-card text-center">
            <div style={{ width: '60px', height: '60px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: 'var(--brand-secondary)' }}>
              <Star size={30} />
            </div>
            <h3>Progress Tracking</h3>
            <p className="text-secondary">Visually track your learning journey and clearly see completed modules.</p>
          </div>
          <div className="glass-card text-center">
            <div style={{ width: '60px', height: '60px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: 'var(--brand-accent)' }}>
              <Trophy size={30} />
            </div>
            <h3>Assessments</h3>
            <p className="text-secondary">Validate your skills with our interactive quizzes at the end of each course.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <h2 className="text-center" style={{ marginBottom: '2.5rem' }}>Featured <span className="text-gradient">Courses</span></h2>
        <div className="grid-cols-3">
          {featuredCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} style={{ color: 'inherit' }}>
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <img src={course.image} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{course.description}</p>
                  <span className="btn btn-secondary btn-full" style={{ padding: '0.5rem' }}>View Course</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
