import React from "react";
import { useAppDispatch } from "@/redux/hook";
import { setCandidateName } from "@/redux/features/jobApp/filter-candidates-by-jobapp/candidateFilterByJobPostSlice";
// import { setTitle } from "@/redux/features/employer/employerJobPostFilterSlice";
// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const SearchCandidateNameFilter = () => {
  const dispatch = useAppDispatch();

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      dispatch(setCandidateName(e.target.value));
    }, 1000);
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Candidate Name</div>
      <form className="input-box position-relative">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search by Name"
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchCandidateNameFilter;
