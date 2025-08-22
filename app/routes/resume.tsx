import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Summary from "~/components/Summary";
import Details from "~/components/Details";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resume-Analyser | REVIEW" },
  { name: "description", content: "Detailed overview of your resume" },
];



const resume = () => {
  const { auth, kv, fs, isLoading } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback|null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      // resume url
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      
      const data = JSON.parse(resume);
      
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      // image url
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      setFeedback(data.feedback);
      console.log("checking url fetched or not ? ", {imageUrl , resumeUrl , feedback: data.feedback} );
    };
    loadResume();
  }, [id]);
  return (
    <main className="!pt-0 h-screen overflow-hidden">
      <nav className="resume-nav shrink-0">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      
      <div className="flex flex-row w-full h-[calc(100vh-80px)] max-lg:flex-col-reverse">
        {/* Resume Preview Section - Made more compact */}
        <section className="w-1/3 max-lg:w-full max-lg:h-1/4 bg-[url('/images/bg-main.jpg')] bg-cover p-3 flex items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border h-full w-fit max-w-full">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" type="application/pdf">
                <img 
                  src={imageUrl} 
                  className="h-full w-auto object-contain rounded-xl shadow-md max-w-full" 
                  title="resume" 
                  alt="Resume preview"
                />
              </a>
            </div>
          )}
        </section>

        {/* Feedback Section - Now has more space */}
        <section className="w-2/3 max-lg:w-full max-lg:h-3/4 flex flex-col p-4 overflow-hidden">
          <div className="shrink-0 mb-3">
            <h2 className="text-xl font-bold text-black">Resume Review</h2>
          </div>
          
          {feedback ? (
            <div className="flex-1 scroll-area space-y-3 animate-in fade-in duration-1000 pr-2">
              <div className="shrink-0">
                <Summary feedback={feedback}/>
              </div>
              <div className="shrink-0">
                <ATS score={feedback.ATS?.score || 0} suggestions={feedback.ATS?.tips || []} />
              </div>
              <div className="flex-1 min-h-0">
                <Details feedback={feedback}/>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <img src="/images/resume-scan-2.gif" alt="Loading" className="max-w-md w-full" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;
