import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = await this.repository.create(createPostDto);
    await this.repository.save(post);
    return post;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const post = await this.repository.findOne(id);
    if (post) return post;
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.repository.update(id, updatePostDto);
    const updatedPost = await this.findOne(id);
    return updatedPost;
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.repository.remove(post);
    return post;
  }
}
