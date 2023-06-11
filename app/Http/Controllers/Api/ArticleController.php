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
        return Article::all();
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
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        //
    }
}
