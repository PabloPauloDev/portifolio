import { CertificationItem } from "@/types/diagram";

export const certifications: CertificationItem[] = [
  {
    certificateName: "AWS Cloud Practitioner",
    description: "Foundational cloud literacy — core AWS services, security, architecture, and pricing models.",
    issueDate: "2021-09-10",
    badgeUrl: "/badges/cloud-practitioner-aws.png",
    color: "#FF9900",
    shape: "hexagon",
  },
  {
    certificateName: "AWS Solutions Architect — Associate",
    description: "Designing resilient, high-performing, secure, and cost-efficient architectures on AWS.",
    issueDate: "2022-03-20",
    badgeUrl: "/badges/solutions-architect-associate-aws.png",
    color: "#FF9900",
    shape: "hexagon",
  },
  {
    certificateName: "B.Sc. Computer Science",
    description: "Four-year degree covering algorithms, distributed systems, databases, and software engineering.",
    issueDate: "2019-06-30",
    badgeUrl: "/degrees/computer-science-bachelor.png",
    color: "#4285F4",
    shape: "rectangle",
  },
];
