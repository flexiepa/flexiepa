use axum::{Router, routing::get};

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "Hello world" }));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3001")
        .await
        .expect("failed to bind 0.0.0.0:3001");

    println!("listening on http://0.0.0.0:3001");

    axum::serve(listener, app).await.expect("server error");
}
