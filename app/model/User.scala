package model

import play.api.data.Form
import play.api.data.Forms.{mapping, text}

case class User(username:String)

object User {
  val form: Form[User] = Form(
    mapping(
      "username" -> text,
    )(User.apply)(User.unapply)
  )
}

