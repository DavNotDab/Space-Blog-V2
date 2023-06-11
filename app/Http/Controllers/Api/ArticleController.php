<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Collection
    {
        return Article::with('user')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Store a newly created resource in the database.
     */
    public function saveArticle(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'You must be logged in to create an article.',
            ], 401);
        }

        $img_name = $request->file('image')->getClientOriginalName();

        $request->file('image')->storeAs('article-images', $img_name);

        $article = Article::create([
            'title' => $request->title,
            'description' => $request->description,
            'content' => $request->article_content,
            'image' => $img_name,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Article created successfully.',
            'article' => $article,
        ], 201);
    }

    /**
     * Update the specified resource in the database.
     */
    public function updateArticle(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'You must be logged in to update an article.',
            ], 401);
        }

        $img_name = $request->file('image')->getClientOriginalName();

        $request->file('image')->storeAs('article-images', $img_name);

        $article = Article::find($request->id);

        $article->title = $request->title;
        $article->description = $request->description;
        $article->content = $request->article_content;
        $article->image = $img_name;
        $article->save();

        return response()->json([
            'message' => 'Article updated successfully.',
            'article' => $article,
        ], 201);
    }


    /**
     * Returns the article with the given id.
     */
    public function getArticle($article_id)
    {
        return Article::where('id', $article_id)
            ->with('user')
            ->first();
    }
}
