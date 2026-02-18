import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/pages.json");

// گرفتن همه صفحات
export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return Response.json(JSON.parse(data));
  } catch (error) {
    return Response.json({ message: "Error reading pages" }, { status: 500 });
  }
}

// ساخت صفحه جدید
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, slug, content } = body;

    if (!title || !slug || !content) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // جلوگیری از slug تکراری
    const slugExists = data.find((page) => page.slug === slug);
    if (slugExists) {
      return Response.json(
        { message: "Slug already exists" },
        { status: 400 }
      );
    }

    const newPage = {
      id: Date.now(),
      title,
      slug,
      content,
      createdAt: new Date().toISOString(),
    };

    data.push(newPage);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json(newPage, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Error creating page" }, { status: 500 });
  }
}
