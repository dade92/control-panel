package domain.utils

import com.github.javafaker.Faker
import domain.DeviceName
import domain.asDeviceName

class DeviceNameGenerator {

    private val faker = Faker()

    fun generate(): DeviceName = faker.funnyName().name().asDeviceName()

}
