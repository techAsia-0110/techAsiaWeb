// keep comments for resuable components in future projects
import { useInView } from 'react-intersection-observer';
import { Trophy, PackageCheck, Users, CircleCheck } from 'lucide-react';
import AnimatedStat from '../ui/AnimatedStat'; 

const stats = [
  { icon: Trophy, value: "8+", label: "Years Experience" },
  { icon: PackageCheck, value: "200+", label: "Projects Delivered" },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: CircleCheck, value: "99%", label: "Success Rate" }
];

const StatsSection = () => {
  // useInView gives us a `ref` to attach and an `inView` boolean
  // `triggerOnce: true` ensures the animation only runs once
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3, // Triggers when 30% of the element is visible
  });

  return (
    <section className="bg-white py-16 sm:py-24">
      {/* We attach the ref from useInView to this container */}
      <div ref={ref} className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon 
                className="mx-auto h-7 w-7 lg:h-12 lg:w-12 text-yellow-500" 
                strokeWidth={1.5} 
              />
              <p className="mt-3 text-3xl md:text-[2.2rem] font-extrabold text-gray-900">
                {/* Conditionally render the animation */}
                {/* If the component is in view, render the animated stat. */}
                {/* If not, render '0' with the suffix as a placeholder. */}
                {inView ? (
                  <AnimatedStat to={stat.value} />
                ) : (
                  <span>0{stat.value.toString().replace(/\d+/g, '')}</span>
                )}
              </p>
              <p className="mt-2 text-[0.7rem] md:text-[0.85rem] font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;