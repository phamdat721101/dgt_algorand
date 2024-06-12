import { request } from "http";
import { matches } from "lodash";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export function middleware1(request: NextRequest){
    const url = request.url
    console.log('middleware1 =>',{url})

    const pathname = request.nextUrl
    console.log('middleware2 =>',{pathname})
    return NextResponse.next()
}

function withMiddleware1(middleware: NextMiddleware){
    return async (request: NextRequest, event: NextFetchEvent)=>{
        const url = request.url
        console.log('middleware1 =>',{url})
        return middleware(request,event)
    }
}

function middleware2(request: NextRequest){
    const pathname = request.nextUrl
    console.log('middleware2 =>',{pathname})
}

// export async function middleware(request: NextRequest){
//     await middleware1(request)
//     await middleware2(request)
// }

function withMiddleware2(middleware: NextMiddleware){
    return async (request: NextRequest, event: NextFetchEvent)=>{
        const pathname = request.nextUrl.pathname
        console.log('middleware2 =>', {pathname})

        return middleware(request,event)
    }
}

export default withMiddleware1(middleware2)

export const config = {
    matches: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}