// components/Person.tsx
import Image from 'next/image';

interface PersonProps {
  name?: string;
  skills?: string[];
  imageUrl?: string;
}

const Person = ({ 
  name = "آرش کاظمی",
  skills = [
    'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است',
   
  ],
  imageUrl = "/images/profile.jpg"
}: PersonProps) => {
  return (
    <section className="bg-[#1d1919] text-white py-12">
      <div className="w-7/12 mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* سمت چپ - عکس پروفایل */}
          <div className="flex-shrink-0">
            <div className="w-[400px] h-[400px] rounded overflow-hidden border-4 border-gray-700">
              <Image
                src={imageUrl}
                alt={name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* سمت راست - نام و مهارت‌ها */}
          <div className="flex-1 text-right">
            <h2 className="text-[27px] font-light tracking-wide text-white mb-6">
              {name}
            </h2>
            
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <p
                  key={index}
                  className="text-[27px] font-light text-gray-300"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Person;