# Threadit

![Status is Active](https://img.shields.io/badge/status-active-brightgreen) ![License is MIT](https://img.shields.io/badge/license-MIT-blue)

A full-stack Reddit clone built with Node.js, GraphQL, Apollo for the backend, and Next.js for the frontend and Typescript on both.

## 🚀 Project Overview

This project is a full-stack, fully functional Reddit clone with many features such as user authentication, CRUD operations on posts, comments and communities, and more.

## 📝 Why I built this?

I wanted to create a full-stack project using technologies that I am not familiar with and learn about them. I also wanted to explore the capabilities of the technologies I was using, and see how they could be used to build a real-world application.

## ✨ Features

- User Authentication using JWT tokens stored in local storage, and email confirmation and password reset functionality using Nodemailer.
- Data stored in PostgreSQL using Supabase and DrizzleORM.
- Authenticated users can create, read, update, and delete posts and comments, and create and join communities.
- Posts and comments can be upvoted and downvoted, and users can save or hide posts.
- Posts can contain images, and videos -which are uploaded using Uploadthing API-, and are creating using markdown to support formatting e.g. bold and italics.
- Users can edit their profile information, Add a profile picture, and view their own profile and other users' profiles.
- Users can start direct chats with other users, or create group chats with multiple users, where they can send real-time messages using websockets and GraphQL subscriptions, including text and images uploaded using Uploadthing API.
- Ability to search for posts, users and communities, and search through comments.
- Ability to sort posts and comments by date, popularity, and relevance, along with pagination for all queries to maximize performance.
- Support for threaded comments, allowing users to reply to comments and view the entire conversation, and collapse or expand the thread.
- Dark mode support for the frontend using NextThemes, and Fully Responsive Design using TailwindCSS and ShadCN.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (git checkout -b feature/amazing-feature)
3. Make your changes
4. Commit your changes (git commit -m 'Add some amazing feature')
5. Push to the branch (git push origin feature/amazing-feature)
6. Open a Pull Request

## 📬 Contact

If you have any questions or would like to discuss this project, please feel free to reach out:

- GitHub: [@AmrMohamed27](https://github.com/AmrMohamed27)
- Email: [amrmohamed2766@gmail.com](mailto:amrmohamed2766@gmail.com)
- LinkedIn: [Amr Mohamed](https://www.linkedin.com/in/amrmohamed27/)

## 🛣️ Roadmap

- [ ] Add support for message read status, and "typing" indicators
- [ ] Add moderator functionality in communities, including the ability to delete posts and comments, and ban users
- [ ] Add a notification system for users, including the ability to customize notification settings and view notifications in real-time

## 📝 License

This project is licensed under the MIT License.
