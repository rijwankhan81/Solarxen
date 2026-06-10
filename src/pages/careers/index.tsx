// pages/careers/index.tsx
"use client";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useState, useRef } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaFilter,
  FaCheckCircle,
  FaTimes,
  FaUsers,
  FaRocket,
  FaLeaf,
  FaChartLine,
  FaHeart,
  FaEnvelope,
  FaUpload,
  FaBuilding,
  FaCode,
  FaHeadset,
  FaPalette,
  FaMoneyBillWave,
  FaBullhorn,
} from "react-icons/fa";
import { MdSolarPower, MdWorkOutline } from "react-icons/md";

import { getAllJobs, getDepartments, type Job } from "@/constants/careersData";
import styles from "./Careers.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  allJobs: Job[];
  departments: string[];
}

export const getStaticProps: GetStaticProps<Props> = () => ({
  props: {
    allJobs: getAllJobs(),
    departments: getDepartments(),
  },
});

// ── Department icon map ────────────────────────────────────────────────────
const DEPT_ICON: Record<string, React.ReactNode> = {
  Engineering: <FaCode />,
  "Sales & Marketing": <FaBullhorn />,
  Operations: <FaBuilding />,
  Finance: <FaMoneyBillWave />,
  "Customer Success": <FaHeadset />,
  Design: <FaPalette />,
};

const DEPT_COLOR: Record<string, string> = {
  Engineering: "blue",
  "Sales & Marketing": "yellow",
  Operations: "green",
  Finance: "teal",
  "Customer Success": "green",
  Design: "purple",
};

const TYPE_COLOR: Record<string, string> = {
  "Full-time": "green",
  "Part-time": "yellow",
  Contract: "blue",
  Remote: "teal",
};

const LEVEL_COLOR: Record<string, string> = {
  "Entry Level": "leaf",
  "Mid Level": "blue",
  Senior: "yellow",
  Lead: "green",
};

// ── Job Card ───────────────────────────────────────────────────────────────
function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  return (
    <div
      className={`${styles.jobCard} ${styles[`jobCard__${DEPT_COLOR[job.department]}`]}`}
    >
      {/* Top row */}
      <div className={styles.jobCard__top}>
        <div
          className={`${styles.jobCard__deptIcon} ${styles[`jobCard__deptIcon__${DEPT_COLOR[job.department]}`]}`}
        >
          {DEPT_ICON[job.department]}
        </div>
        <div className={styles.jobCard__badges}>
          <Badge
            className={`${styles.typeBadge} ${styles[`typeBadge__${TYPE_COLOR[job.type]}`]}`}
          >
            {job.type}
          </Badge>
          <Badge
            className={`${styles.levelBadge} ${styles[`levelBadge__${LEVEL_COLOR[job.level]}`]}`}
          >
            {job.level}
          </Badge>
        </div>
      </div>

      {/* Title + dept */}
      <h3 className={styles.jobCard__title}>{job.title}</h3>
      <div className={styles.jobCard__dept}>{job.department}</div>

      {/* Meta row */}
      <div className={styles.jobCard__meta}>
        <span>
          <FaMapMarkerAlt /> {job.location}
        </span>
        <span>
          <FaMoneyBillWave /> {job.salary}
        </span>
        <span>
          <FaClock /> Deadline: {job.deadline}
        </span>
      </div>

      {/* Summary */}
      <p className={styles.jobCard__summary}>{job.summary}</p>

      {/* Tags */}
      <div className={styles.jobCard__tags}>
        {job.tags.map((t) => (
          <span key={t} className={styles.jobCard__tag}>
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.jobCard__footer}>
        <span className={styles.jobCard__posted}>Posted {job.posted}</span>
        <Button className={styles.btn__primary} onClick={() => onApply(job)}>
          Apply Now <FaArrowRight />
        </Button>
      </div>
    </div>
  );
}

// ── Apply Form Modal / Panel ───────────────────────────────────────────────
function ApplyForm({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    coverNote: "",
  });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handle = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!job) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal header */}
        <div className={styles.modal__header}>
          <div className={styles.modal__headerLeft}>
            <div className={styles.modal__headerIcon}>
              <MdSolarPower />
            </div>
            <div>
              <span className={styles.modal__headerSub}>Apply for</span>
              <h3 className={styles.modal__headerTitle}>{job.title}</h3>
            </div>
          </div>
          <button
            className={styles.modal__close}
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Job quick info strip */}
        <div className={styles.modal__jobInfo}>
          <span>
            <FaBuilding /> {job.department}
          </span>
          <span>
            <FaMapMarkerAlt /> {job.location}
          </span>
          <span>
            <FaBriefcase /> {job.type}
          </span>
          <span>
            <FaMoneyBillWave /> {job.salary}
          </span>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className={styles.modal__success}>
            <div className={styles.modal__successIcon}>
              <FaCheckCircle />
            </div>
            <h3>Application Submitted!</h3>
            <p>
              Thank you <strong>{form.name || "there"}</strong>! We've received
              your application for <strong>{job.title}</strong>. Our team will
              review it and get back to you within 5–7 business days.
            </p>
            <div className={styles.modal__successSteps}>
              {[
                "We review your application",
                "HR screening call",
                "Technical / role interview",
                "Offer & onboarding",
              ].map((s, i) => (
                <div key={i} className={styles.modal__successStep}>
                  <span className={styles.modal__successStepNum}>{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <Button className={styles.btn__outline} onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={submit} className={styles.modal__form}>
            <Row className="g-3">
              <Col sm={6}>
                <div className={styles.formGroup}>
                  <label>Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Karim Hossain"
                    value={form.name}
                    onChange={handle}
                    className={styles.formInput}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+880 1X XX XXX XXX"
                    value={form.phone}
                    onChange={handle}
                    className={styles.formInput}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handle}
                    className={styles.formInput}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className={styles.formGroup}>
                  <label>Current City *</label>
                  <select
                    name="city"
                    required
                    value={form.city}
                    onChange={handle}
                    className={styles.formSelect}
                  >
                    <option value="">Select city</option>
                    {[
                      "Dhaka",
                      "Chittagong",
                      "Rajshahi",
                      "Sylhet",
                      "Khulna",
                      "Barisal",
                      "Other",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col sm={12}>
                <div className={styles.formGroup}>
                  <label>Years of Experience *</label>
                  <select
                    name="experience"
                    required
                    value={form.experience}
                    onChange={handle}
                    className={styles.formSelect}
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0–1 years (Fresher)</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5-8">5–8 years</option>
                    <option value="8+">8+ years</option>
                  </select>
                </div>
              </Col>

              {/* Resume upload */}
              <Col sm={12}>
                <div className={styles.formGroup}>
                  <label>Resume / CV *</label>
                  <div
                    className={`${styles.fileUpload} ${fileName ? styles["fileUpload--filled"] : ""}`}
                    onClick={() => fileRef.current?.click()}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFile}
                      className={styles.fileUpload__input}
                      required
                    />
                    <FaUpload className={styles.fileUpload__icon} />
                    <div className={styles.fileUpload__text}>
                      {fileName ? (
                        <span className={styles.fileUpload__name}>
                          {fileName}
                        </span>
                      ) : (
                        <>
                          <strong>Click to upload</strong> your resume
                          <span>PDF, DOC, DOCX — max 5 MB</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm={12}>
                <div className={styles.formGroup}>
                  <label>
                    Cover Note{" "}
                    <span className={styles.formGroup__optional}>
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="coverNote"
                    rows={3}
                    placeholder="Tell us why you'd be a great fit for this role..."
                    value={form.coverNote}
                    onChange={handle}
                    className={styles.formTextarea}
                  />
                </div>
              </Col>

              <Col sm={12}>
                <Button
                  type="submit"
                  className={`${styles.btn__primary} w-100`}
                  style={{
                    justifyContent: "center",
                    padding: "15px",
                    fontSize: "1rem",
                  }}
                >
                  Submit Application <FaArrowRight />
                </Button>
                <p className={styles.formDisclaimer}>
                  <FaCheckCircle /> Your information is kept private and secure.
                </p>
              </Col>
            </Row>
          </form>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
const CareersPage: NextPage<Props> = ({ allJobs, departments }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const filtered = allJobs.filter((j) => {
    const deptMatch = activeFilter === "all" || j.department === activeFilter;
    const typeMatch = activeType === "all" || j.type === activeType;
    return deptMatch && typeMatch;
  });

  const scrollToJobs = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Head>
        <title>Careers | Solarxen Bangladesh</title>
        <meta
          name="description"
          content="Join Solarxen and help build Bangladesh's largest rooftop solar network. View open positions across engineering, sales, operations, and more."
        />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.hero}>
          <div className={styles.hero__bgGrid} />
          <div className={styles.hero__bgGlow1} />
          <div className={styles.hero__bgGlow2} />

          <Container>
            <Row className="align-items-center g-5">
              {/* Left content */}
              <Col lg={6} className={styles.hero__left}>
                <Badge className={styles.sectionBadge}>
                  <MdWorkOutline /> We're Hiring
                </Badge>

                <h1 className={styles.hero__headline}>
                  Build Bangladesh's
                  <br />
                  <span className={styles.hero__accent}>
                    Clean Energy Future
                  </span>
                  <br />
                  With Us
                </h1>

                <p className={styles.hero__sub}>
                  Join a fast-growing team on a mission to connect every rooftop
                  in Bangladesh to a smarter, cleaner energy network — while
                  helping families earn real monthly income.
                </p>

                {/* Culture pills */}
                <div className={styles.hero__culturePills}>
                  {[
                    { icon: <FaRocket />, text: "Fast Growth" },
                    { icon: <FaLeaf />, text: "Real Impact" },
                    { icon: <FaHeart />, text: "Great Culture" },
                    { icon: <FaChartLine />, text: "Career Growth" },
                  ].map((p, i) => (
                    <div key={i} className={styles.hero__culturePill}>
                      {p.icon} {p.text}
                    </div>
                  ))}
                </div>

                <div className={styles.hero__actions}>
                  <Button
                    className={styles.btn__primary}
                    onClick={scrollToJobs}
                  >
                    View Open Positions <FaArrowRight />
                  </Button>
                  <Button className={styles.btn__outline}>
                    <FaEnvelope /> Send Speculative CV
                  </Button>
                </div>
              </Col>

              {/* Right — visual */}
              <Col lg={6}>
                <div className={styles.hero__visual}>
                  {/* Main card */}
                  <div className={styles.hero__card}>
                    <div className={styles.hero__cardHeader}>
                      <MdSolarPower className={styles.hero__cardLogo} />
                      <span>Open Positions at Solarxen</span>
                      <Badge className={styles.hero__cardBadge}>
                        {allJobs.length} Roles
                      </Badge>
                    </div>
                    <div className={styles.hero__cardList}>
                      {allJobs.slice(0, 4).map((j) => (
                        <div key={j.id} className={styles.hero__cardJob}>
                          <div
                            className={`${styles.hero__cardJobIcon} ${styles[`hero__cardJobIcon__${DEPT_COLOR[j.department]}`]}`}
                          >
                            {DEPT_ICON[j.department]}
                          </div>
                          <div className={styles.hero__cardJobInfo}>
                            <strong>{j.title}</strong>
                            <span>
                              {j.department} · {j.location}
                            </span>
                          </div>
                          <Badge
                            className={`${styles.typeBadge} ${styles[`typeBadge__${TYPE_COLOR[j.type]}`]}`}
                          >
                            {j.type}
                          </Badge>
                        </div>
                      ))}
                      <div
                        className={styles.hero__cardMore}
                        onClick={scrollToJobs}
                      >
                        +{allJobs.length - 4} more positions <FaArrowRight />
                      </div>
                    </div>
                  </div>

                  {/* Floating perks */}
                  <div className={styles.hero__perk1}>
                    <FaUsers className={styles.hero__perkIcon} />
                    <div>
                      <strong>Growing Team</strong>
                      <span>50+ people & counting</span>
                    </div>
                  </div>
                  <div className={styles.hero__perk2}>
                    <FaLeaf className={styles.hero__perkIcon2} />
                    <div>
                      <strong>Real Mission</strong>
                      <span>Clean energy for all</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — JOB LISTINGS
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.listings} ref={listRef}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Open Roles</Badge>
              <h2 className={styles.sectionTitle}>Current Job Openings</h2>
              <p className={styles.sectionSub}>
                {allJobs.length} open positions across {departments.length}{" "}
                departments
              </p>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
              {/* Department filter */}
              <div className={styles.filters__row}>
                <span className={styles.filters__label}>
                  <FaFilter /> Department
                </span>
                <div className={styles.filters__pills}>
                  <button
                    className={`${styles.filterPill} ${activeFilter === "all" ? styles.filterPill__active : ""}`}
                    onClick={() => setActiveFilter("all")}
                  >
                    All Departments
                  </button>
                  {departments.map((d) => (
                    <button
                      key={d}
                      className={`${styles.filterPill} ${activeFilter === d ? styles.filterPill__active : ""}`}
                      onClick={() => setActiveFilter(d)}
                    >
                      {DEPT_ICON[d]} {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Job type filter */}
              <div className={styles.filters__row}>
                <span className={styles.filters__label}>
                  <FaBriefcase /> Type
                </span>
                <div className={styles.filters__pills}>
                  {["all", "Full-time", "Part-time", "Contract", "Remote"].map(
                    (t) => (
                      <button
                        key={t}
                        className={`${styles.filterPill} ${styles.filterPill__sm} ${activeType === t ? styles.filterPill__active : ""}`}
                        onClick={() => setActiveType(t)}
                      >
                        {t === "all" ? "All Types" : t}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Result count */}
              <div className={styles.filters__count}>
                Showing <strong>{filtered.length}</strong> of {allJobs.length}{" "}
                positions
                {(activeFilter !== "all" || activeType !== "all") && (
                  <button
                    className={styles.filters__clearBtn}
                    onClick={() => {
                      setActiveFilter("all");
                      setActiveType("all");
                    }}
                  >
                    <FaTimes /> Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Job cards */}
            {filtered.length === 0 ? (
              <div className={styles.listings__empty}>
                <MdWorkOutline />
                <h4>No positions match your filters</h4>
                <p>
                  Try adjusting the department or type filter, or check back
                  soon for new openings.
                </p>
                <Button
                  className={styles.btn__outline}
                  onClick={() => {
                    setActiveFilter("all");
                    setActiveType("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Row className="g-4">
                {filtered.map((job) => (
                  <Col key={job.id} xs={12} md={6} xl={4}>
                    <JobCard job={job} onApply={setSelectedJob} />
                  </Col>
                ))}
              </Row>
            )}

            {/* No openings CTA */}
            <div className={styles.listings__speculativeCta}>
              <div className={styles.listings__speculativeLeft}>
                <FaEnvelope className={styles.listings__speculativeIcon} />
                <div>
                  <strong>Don't see the right role?</strong>
                  <span>
                    Send us your CV and we'll reach out when a matching position
                    opens.
                  </span>
                </div>
              </div>
              <Button
                className={styles.btn__outline}
                onClick={() =>
                  setSelectedJob({
                    id: 0,
                    slug: "speculative",
                    title: "Speculative Application",
                    department: "Engineering",
                    type: "Full-time",
                    level: "Mid Level",
                    location: "Bangladesh",
                    salary: "Competitive",
                    posted: "",
                    postedISO: "",
                    deadline: "Open",
                    summary: "General application — tell us about yourself.",
                    responsibilities: [],
                    requirements: [],
                    tags: [],
                  })
                }
              >
                Send Speculative CV <FaArrowRight />
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />

      {/* Apply form modal — rendered outside sections for overlay */}
      {selectedJob && (
        <ApplyForm job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
};

export default CareersPage;
