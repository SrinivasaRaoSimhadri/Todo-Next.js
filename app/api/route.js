import { ConnetDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnetDB();
}

LoadDB();

export async function GET(request) {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos : todos });
}

export async function POST(request) {

  const {title , description } =  await request.json();

  await TodoModel.create({
    title ,
    description
  })

  return NextResponse.json({ msg: "Todo Created"});
}

export async function DELETE(request) {
  const mangoid = await request.nextUrl.searchParams.get("mongoid");
  await TodoModel.findByIdAndDelete(mangoid);
  return NextResponse.json({ msg: "Todo Deleted"});
}

export async function PUT(request) {
  const mangoid = await request.nextUrl.searchParams.get("mongoid");
  await TodoModel.findByIdAndUpdate(mangoid ,{
    $set : {
      isCompleted : true
    }
  });
  return NextResponse.json({ msg: "Todo completed"});
}