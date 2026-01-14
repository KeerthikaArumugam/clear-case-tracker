export type UserRole = "user" | "admin";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  passwordHash: string;
  createdAt: string;
};

export type ComplaintStatus = "pending" | "in-progress" | "resolved" | "rejected";
export type ComplaintPriority = "low" | "medium" | "high" | "urgent";

export type ComplaintUpdate = {
  id: string;
  at: string;
  author: string;
  message: string;
};

export type Complaint = {
  id: string;
  title: string;
  category: string;
  department: string;
  location: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  submittedByUserId: string;
  submittedByName: string;
  assignedTo?: string;
  updates: ComplaintUpdate[];
};

type Session = { userId: string };

const STORAGE_KEYS = {
  users: "smarttrack.users.v1",
  complaints: "smarttrack.complaints.v1",
  session: "smarttrack.session.v1",
  complaintCounter: "smarttrack.complaints.counter.v1",
} as const;

function parseJson<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readUsers(): AppUser[] {
  return parseJson<AppUser[]>(localStorage.getItem(STORAGE_KEYS.users)) ?? [];
}

function writeUsers(users: AppUser[]) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function readComplaints(): Complaint[] {
  return parseJson<Complaint[]>(localStorage.getItem(STORAGE_KEYS.complaints)) ?? [];
}

function writeComplaints(complaints: Complaint[]) {
  localStorage.setItem(STORAGE_KEYS.complaints, JSON.stringify(complaints));
}

function readSession(): Session | null {
  return parseJson<Session>(localStorage.getItem(STORAGE_KEYS.session));
}

function writeSession(session: Session | null) {
  if (!session) {
    localStorage.removeItem(STORAGE_KEYS.session);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
}

function getNextComplaintId(now: Date) {
  const year = now.getFullYear();
  const counterRaw = localStorage.getItem(STORAGE_KEYS.complaintCounter);
  const counter = Number(counterRaw ?? "0");
  const next = Number.isFinite(counter) ? counter + 1 : 1;
  localStorage.setItem(STORAGE_KEYS.complaintCounter, String(next));
  return `CMP-${year}-${String(next).padStart(3, "0")}`;
}

function randomId(prefix: string) {
  const randomPart = Math.random().toString(16).slice(2, 10);
  return `${prefix}_${Date.now().toString(16)}_${randomPart}`;
}

function toHex(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return toHex(hash);
}

export async function ensureSeedData() {
  const users = readUsers();
  if (users.length > 0) return;

  const now = new Date().toISOString();
  const adminPasswordHash = await hashPassword("Admin123!");
  const userPasswordHash = await hashPassword("User123!");

  const seededUsers: AppUser[] = [
    {
      id: "user_admin_1",
      name: "Admin",
      email: "admin@smarttrack.com",
      role: "admin",
      passwordHash: adminPasswordHash,
      createdAt: now,
    },
    {
      id: "user_demo_1",
      name: "John Doe",
      email: "john@smarttrack.com",
      phone: "+1 (555) 000-0000",
      role: "user",
      passwordHash: userPasswordHash,
      createdAt: now,
    },
    {
      id: "user_demo_2",
      name: "Jane Smith",
      email: "jane@smarttrack.com",
      phone: "+1 (555) 111-1111",
      role: "user",
      passwordHash: userPasswordHash,
      createdAt: now,
    },
  ];

  writeUsers(seededUsers);

  const seededComplaints: Complaint[] = [
    {
      id: "CMP-2024-001",
      title: "Water leakage in Block A bathroom",
      category: "Plumbing",
      department: "Maintenance",
      location: "Block A, Floor 2",
      description:
        "There is a water leakage from the pipe under the sink in the men's bathroom. It is creating a slip hazard.",
      priority: "high",
      status: "in-progress",
      createdAt: new Date("2024-01-05T14:15:00.000Z").toISOString(),
      submittedByUserId: "user_demo_1",
      submittedByName: "John Doe",
      assignedTo: "Mike Johnson",
      updates: [
        {
          id: randomId("upd"),
          at: new Date("2024-01-05T14:15:00.000Z").toISOString(),
          author: "System",
          message: "Complaint received and registered successfully.",
        },
        {
          id: randomId("upd"),
          at: new Date("2024-01-05T16:00:00.000Z").toISOString(),
          author: "System",
          message: "Complaint assigned to Mike Johnson from Maintenance department.",
        },
        {
          id: randomId("upd"),
          at: new Date("2024-01-06T10:30:00.000Z").toISOString(),
          author: "Mike Johnson",
          message: "Issue reviewed. Plumber scheduled for today afternoon.",
        },
      ],
    },
    {
      id: "CMP-2024-002",
      title: "Broken AC unit in Room 302",
      category: "Electrical",
      department: "Facilities",
      location: "Main Building, Room 302",
      description: "AC unit is not turning on. Room is getting very hot during lectures.",
      priority: "medium",
      status: "pending",
      createdAt: new Date("2024-01-04T09:05:00.000Z").toISOString(),
      submittedByUserId: "user_demo_2",
      submittedByName: "Jane Smith",
      assignedTo: "Unassigned",
      updates: [
        {
          id: randomId("upd"),
          at: new Date("2024-01-04T09:05:00.000Z").toISOString(),
          author: "System",
          message: "Complaint received and registered successfully.",
        },
      ],
    },
  ];

  writeComplaints(seededComplaints);

  localStorage.setItem(STORAGE_KEYS.complaintCounter, "2");
}

export function getCurrentUser() {
  const session = readSession();
  if (!session) return null;
  const user = readUsers().find((u) => u.id === session.userId);
  if (!user) return null;
  return user;
}

export type AuthResult =
  | { ok: true; user: AppUser }
  | { ok: false; error: string };

export async function loginWithEmailPassword(email: string, password: string): Promise<AuthResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) return { ok: false, error: "Invalid email or password." };

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) return { ok: false, error: "Invalid email or password." };

  writeSession({ userId: user.id });
  return { ok: true, user };
}

export async function signupWithEmailPassword(input: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (input.password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

  const users = readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email);
  if (exists) return { ok: false, error: "An account with this email already exists." };

  const passwordHash = await hashPassword(input.password);
  const newUser: AppUser = {
    id: randomId("user"),
    name,
    email,
    phone: input.phone?.trim() || undefined,
    role: "user",
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  writeUsers([newUser, ...users]);
  writeSession({ userId: newUser.id });
  return { ok: true, user: newUser };
}

export function logout() {
  writeSession(null);
}

export function listComplaintsForUser(userId: string) {
  return readComplaints().filter((c) => c.submittedByUserId === userId);
}

export function listAllComplaints() {
  return readComplaints();
}

export function getComplaintById(id: string) {
  return readComplaints().find((c) => c.id === id) ?? null;
}

export function addComplaintUpdate(id: string, update: Omit<ComplaintUpdate, "id">) {
  const complaints = readComplaints();
  const index = complaints.findIndex((c) => c.id === id);
  if (index < 0) return null;

  const next: Complaint = {
    ...complaints[index],
    updates: [{ ...update, id: randomId("upd") }, ...complaints[index].updates],
  };

  const nextComplaints = [...complaints];
  nextComplaints[index] = next;
  writeComplaints(nextComplaints);
  return next;
}

export function createComplaint(input: {
  title: string;
  category: string;
  department: string;
  location: string;
  priority: ComplaintPriority;
  description: string;
  submittedByUserId: string;
  submittedByName: string;
}) {
  const now = new Date();
  const id = getNextComplaintId(now);
  const complaint: Complaint = {
    id,
    title: input.title.trim(),
    category: input.category,
    department: input.department,
    location: input.location.trim(),
    priority: input.priority,
    status: "pending",
    description: input.description.trim(),
    createdAt: now.toISOString(),
    submittedByUserId: input.submittedByUserId,
    submittedByName: input.submittedByName,
    assignedTo: "Unassigned",
    updates: [
      {
        id: randomId("upd"),
        at: now.toISOString(),
        author: "System",
        message: "Complaint received and registered successfully.",
      },
    ],
  };

  const complaints = readComplaints();
  writeComplaints([complaint, ...complaints]);
  return complaint;
}

export function updateComplaintStatus(id: string, status: ComplaintStatus, actorName: string) {
  const complaints = readComplaints();
  const index = complaints.findIndex((c) => c.id === id);
  if (index < 0) return null;

  const now = new Date().toISOString();
  const next: Complaint = {
    ...complaints[index],
    status,
    updates: [
      {
        id: randomId("upd"),
        at: now,
        author: actorName,
        message: `Status updated to ${status}.`,
      },
      ...complaints[index].updates,
    ],
  };
  const nextComplaints = [...complaints];
  nextComplaints[index] = next;
  writeComplaints(nextComplaints);
  return next;
}

export function deleteComplaint(id: string) {
  const complaints = readComplaints();
  const next = complaints.filter((c) => c.id !== id);
  writeComplaints(next);
}

export function formatDateShort(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export function formatDateTime(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

