package actors

import akka.actor.{Actor, ActorRef}
import play.mvc.BodyParser.Json

class ChatManager extends Actor{
  private var chatters = List.empty[ActorRef]
  import ChatManager._
  override def receive: Receive = {
    case NewChatter(chatter) => chatters ::= chatter
    case Message(msg) =>
      for(c <- chatters.filterNot(_ == sender())) {
        c ! ChatActor.SendMessage(msg)
      }
    case m => println("unhandled message in ChatManager : " + m)
  }
}

object ChatManager{
  case class NewChatter(chatter:ActorRef)
  case class Message(msg:String)
}
