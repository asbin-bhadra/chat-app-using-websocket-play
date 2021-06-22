package controllers

import actors.{ChatActor, ChatManager}
import akka.actor.{ActorSystem, Props}
import akka.stream.Materializer
import model.User
import play.api.libs.streams.ActorFlow
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request, WebSocket}

import javax.inject.{Inject, Singleton}

@Singleton
class WebSocketChat @Inject()(cc : ControllerComponents)(implicit system: ActorSystem, mat : Materializer) extends AbstractController(cc){


  val manager = system.actorOf(Props[ChatManager], "manager")

  def test =Action{implicit request : Request[AnyContent] =>
    Ok(views.html.test())
  }

  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index(User.form))
  }


  def chat = Action{implicit request =>
    val formData: User = User.form.bindFromRequest.get
    println(formData.username)
    Ok(views.html.chatPage(formData.username))
  }

  def socket = WebSocket.accept[String,String]{ request =>
    ActorFlow.actorRef{ out =>
      ChatActor.props(out, manager)
    }
  }

}
