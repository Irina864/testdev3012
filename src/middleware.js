// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('access_token');
//   const mode = request.cookies.get('user_mode');

//   // Проверка на авторизацию
//   if (!token && pathname.includes('employer')) {
//     return NextResponse.redirect('/vacancies');
//   }
//   if (!token && pathname.includes('applicant')) {
//     return NextResponse.redirect('/resumes');
//   }

//   //  условия для авторизованных пользователей
//   if (token && mode === 'applicant' && pathname.includes('employer')) {
//     return NextResponse.redirect('/vacancies');
//   }
//   if (token && mode === 'employer' && pathname.includes('applicant')) {
//     return NextResponse.redirect('/resumes');
//   }

//   return NextResponse.next();
// }
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token');
  const mode = request.cookies.get('user_mode');

  const url = request.nextUrl.clone();

  // Проверка на авторизацию
  if (!token && pathname.includes('employer')) {
    url.pathname = '/resumes';
    return NextResponse.redirect(url);
  }
  if (!token && pathname.includes('applicant')) {
    url.pathname = '/vacancies';
    return NextResponse.redirect(url);
  }

  //  условия для авторизованных пользователей
  if (token && mode === 'applicant' && pathname.includes('employer')) {
    url.pathname = '/vacancies';
    return NextResponse.redirect(url);
  }
  if (token && mode === 'employer' && pathname.includes('applicant')) {
    url.pathname = '/resumes';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
