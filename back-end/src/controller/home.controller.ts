import { Controller, Post, Get, Body, Inject, Param } from '@midwayjs/core';
import { UserinfoService } from '../service/userinfo.service';
import { ZonesService } from '../service/zones.service';
import { PostsService } from '../service/posts.service';
import { CommentsService } from '../service/comments.service';

@Controller('/api')
export class HomeController {
  @Inject()
  private userinfoService: UserinfoService;
  @Inject()
  private zonesService: ZonesService;
  @Inject()
  private postService: PostsService;
  @Inject()
  private commentsService: CommentsService;

  @Get('/')
  async home2() {
    return { message: 'home' };
  }

  @Post('/register')
  async register(@Body() body: { username: string, email: string, password: string }) {
    const { username, email, password } = body;
    try {
      const user = await this.userinfoService.register(username, email, password);
      return { message: '注册成功!', userId: user.id };
    } catch (error) {
      console.error(error);
      return { message: '出错了~' };
    }
  }

  @Post('/login')
  async login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    try {
      const user = await this.userinfoService.getUserByName(username);
      if (user) {
        const bcrypt = require('bcrypt');
        if (await bcrypt.compare(password, user.password)) {
          return { message: '登录成功！', user: user };
        } else {
          return { message: '密码错误' }
        }
      } else {
        return { message: '不存在用户：' + username };
      }
    } catch (error) {
      console.log(error);
      return { message: '出错了： ' + error.message };
    }
  }

  @Post('/createZone')
  async createZone(@Body() body: { name: string, introduction: string, category: string, creator: number }) {
    const { name, introduction, category, creator } = body;
    try {
      const zone = await this.zonesService.create(name, introduction, category, creator);
      if (zone) {
        return { message: 'New Zone Created!' };
      } else {
        return { message: 'Creation failed...' }
      }
    } catch (error) {
      console.log(error);
      return { message: 'Creation failed:' + error.message };
    }
  }
  @Get('/createZone')
  async createZonePage() {
    return;
  }
  @Get('/publishPost')
  async publishPostPage() {
    return;
  }
  @Post('/publishPost')
  async publishPost(@Body() body: { title: string, content: string, zone: number, creator: number, introduction: string }) {
    const { title, content, zone, creator, introduction } = body;
    try {
      const new_content = await this.postService.create(title, introduction, zone, creator, content);
      if (new_content) {
        await this.zonesService.updatePostCount(zone)
        return { message: 'New Content Created!' };
      } else {
        return { message: 'Creation failed...' }
      }
    } catch (error) {
      console.log(error);
      return { message: 'Creation failed:' + error.message };
    }
  }
  @Get('/getZones')
  async getZones() {
    return await this.zonesService.getAll();
  }

  @Post('/getPosts')
  async getPosts(@Body() body: { zones: number[], user: number }) {
    const { zones, user } = body;
    return await this.postService.getAll(zones, user);
  }
  @Get('/zone/:zoneID')
  async getZoneByID(@Param('zoneID') zoneID: number) {
    return await this.zonesService.getByID(zoneID);
  }
  @Get('/post/:postID')
  async getPostIDByID(@Param('postID') postID: number) {
    return await this.postService.getByID(postID);
  }
  @Get('/getPosts/:zoneID')
  async getPostIDByZone(@Param('zoneID') zoneID: number) {
    return await this.postService.getByZone(zoneID);
  }

  @Post('/sendComment')
  async sendComment(@Body() body: { post: number, creator: number, content: string }) {
    const { post, creator, content } = body;
    const result = await this.commentsService.create(post, creator, content);
    if (result) {
      await this.postService.updateCommentCount(post)
      return { message: 'New Content Created!' };
    } else {
      return { message: 'Creation failed...' }
    }
  }

  @Post('/getComments')
  async getComments(@Body() body: { post: number }) {
    const { post } = body;
    return this.commentsService.getAllFromPost(post);
  }

  @Get('/user/:ID')
  async getUser(@Param('ID') ID: number) {
    return await this.userinfoService.getUserByID(ID);
  }
  @Get('/register/checkUsername/:username')
  async checkUsername(@Param('username') username: string) {
    return await this.userinfoService.checkUsername(username);
  } @Get('/register/checkEmail/:email')
  async checkEmail(@Param('email') email: string) {
    return await this.userinfoService.checkEmail(email);
  }
  @Get('/password/getHashed/:password')
  async getHasahed(@Param('password') password: string) {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }


}